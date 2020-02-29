package com.example.cookit

import android.net.Uri
import kotlinx.coroutines.Job
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStream
import java.net.CacheRequest
import java.net.URL
import javax.net.ssl.HostnameVerifier
import javax.net.ssl.HttpsURLConnection
import javax.net.ssl.SSLContext

class NetOperations(ip: String, port: Int) {
    private val ip = ip
    private val port = port

    fun getRecipe(option: String): String{
        val url = URL("https://$ip/randomRecipe/${option.replace(" ", "-")}")
        return requestURL(url)
    }

    fun getRecipeNames(): String{
        val url = URL("https://$ip/recipeNames")
        return requestURL(url)
    }

    fun getAPI(request: String): String{
        val url = URL("https://$ip$request")
        return requestURL(url)
    }

    fun getByIngredients(ingredients: List<String>, shrink: Boolean): String{
        var uri = Uri.Builder()
        uri.scheme("https")
        uri.authority(ip)
        uri.appendPath("recipe")
        uri.appendPath("byIngredient")
        uri.appendQueryParameter("ingredient", ingredients.joinToString ("#"))
        uri.appendQueryParameter("shrink", shrink.toString())

        val url = URL(uri.build().toString())
        return requestURL(url)
    }


    private fun requestURL(url: URL): String{
        try {
            val urlConnection = url.openConnection() as HttpsURLConnection
            val inputStream: InputStream = urlConnection.inputStream
            var ret = BufferedReader(inputStream.reader()).readText()
            urlConnection.disconnect()
            return ret
        }
        catch (error: IOException){
            return ""
        }
    }
}