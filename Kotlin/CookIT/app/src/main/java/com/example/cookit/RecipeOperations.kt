package com.example.cookit

import android.content.Context
import com.example.cookit.Models.RecipeDetails
import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.Moshi
import com.squareup.picasso.Picasso
import kotlinx.coroutines.*
import java.lang.Exception
import javax.net.ssl.SSLContext

class RecipeOperations (ip: String, port: Int) {

    private var option = ""

    var recipeQueue = mutableListOf<String>()
    val recipeQueueLen = 15
    val pastQueueLen = 5
    var queueIndex = 0

    private val ip = ip
    private val port = port

    private val no = NetOperations(ip=ip, port=port)

    private val moshi: Moshi = Moshi.Builder().build()
    private val adapter: JsonAdapter<RecipeDetails> = moshi.adapter(
        RecipeDetails::class.java)

    fun getRecipe(): RecipeDetails?{
        return if (recipeQueue.size > 0){
            adapter.fromJson(recipeQueue[queueIndex])!!
        }else{
            null
        }
    }

    fun getPrevious(): RecipeDetails?{
        return if (queueIndex > 0){
            queueIndex -= 1
            adapter.fromJson(recipeQueue[queueIndex])!!
        } else{
            null
        }
    }

    fun getImagesList():List<String>{
        var images = mutableListOf<String>()
        for (element in recipeQueue){
            var img = adapter.fromJson(element)
            if (img != null){
                images.add(img.image)
            }
        }
        return images
    }

    private fun getFutureImagesList():List<String>{
        var images = mutableListOf<String>()
        try {
            for (element in recipeQueue) {
                var img = adapter.fromJson(element)
                if (img != null) {
                    images.add(img.image)
                }
            }
        }
        catch(e: Exception){
            println(e)
        }
        return images
    }

    fun getNext(): RecipeDetails?{
        return if (queueIndex < pastQueueLen){
            if (recipeQueue.size > queueIndex+1) {
                queueIndex += 1
                adapter.fromJson(recipeQueue[queueIndex])!!
            }else{
                null
            }
        } else{
            recipeQueue.removeAt(0)
            CoroutineScope(Dispatchers.IO).launch {
                recipeQueue.add(no.getRecipe(option))
            }
            adapter.fromJson(recipeQueue[queueIndex])!!
        }
    }

    fun clearFuture(){
        for (i in queueIndex until recipeQueue.size){
            recipeQueue.removeAt(recipeQueue.size-1)
        }
    }

    fun fillFuture(){
        while(recipeQueue.size > recipeQueueLen){
            recipeQueue.removeAt(recipeQueue.size-1)
        }
        for(i in recipeQueue.size..recipeQueueLen){
            recipeQueue.add(no.getRecipe(option))
        }
    }

    fun fillFutureAndPreload(context: Context): Boolean{
        CoroutineScope(Dispatchers.IO).launch {
            fillFuture()
            var images = getFutureImagesList()
            for (image in images){
                Picasso.with(context).load(image).fetch()
            }
        }
        return true
    }

    fun getSize(): Int{
        return recipeQueue.size
    }

    fun setOption(option_: String){
        option = option_
    }

    fun getOption(): String?{
        return if (option == ""){
            null
        }
        else{
            option
        }
    }

    fun abortRequests(){
        if(CoroutineScope(Dispatchers.IO).isActive){
            CoroutineScope(Dispatchers.IO).cancel("ABORT REQUEST")
            println("--- ABORT REQUEST")
        }
    }
}