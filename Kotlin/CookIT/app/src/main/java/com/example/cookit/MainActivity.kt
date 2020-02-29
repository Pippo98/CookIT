package com.example.cookit

import android.content.Context
import android.net.ConnectivityManager
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import com.google.android.material.bottomnavigation.BottomNavigationView
import io.supercharge.shimmerlayout.ShimmerLayout
import java.io.File
import java.net.InetSocketAddress
import java.net.Socket
import java.net.SocketAddress
import java.util.*
import javax.net.ssl.SSLContext


class MainActivity : AppCompatActivity() {

    //private var ip = "192.168.1.180"
    //private var ip = "192.168.43.207"
    //private val ip = "10.230.160.224"
    //private var ip = "192.168.1.239"
    //private val ip = "192.168.1.207"
    //private var ip = "192.168.1.101"
    //private val ip = "192.168.43.207"
    private val ip = "cookit-server.herokuapp.com"
    private val port = 21233

    private lateinit var sslContext: SSLContext

    private lateinit var ro: RecipeOperations
    private lateinit var no: NetOperations

    private var CONNECTED = true
    private var HOST_REACHABLE = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val mOnNavigationItemSelectedListener = BottomNavigationView.OnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_random -> {
                    if (CONNECTED && HOST_REACHABLE) {
                        val randomFragment = RandomFragment.newInstance(ro)
                        openFragment(randomFragment)
                    }
                    return@OnNavigationItemSelectedListener true
                }
                R.id.nav_search -> {
                    if (CONNECTED && HOST_REACHABLE) {
                        val searchFragment = SearchFragment.newInstance(no)
                        openFragment(searchFragment)
                    }
                    return@OnNavigationItemSelectedListener true
                }
            }
            return@OnNavigationItemSelectedListener false
        }


        var mMainNav = findViewById<BottomNavigationView>(R.id.bottom_menu)
        mMainNav.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener)

        // Writing SSL Certificate
        //var path = writeCertificate(1)!!
        //var cen = SSLContextGenerator()
        //sslContext = cen.createCTX(path)
    }

    override fun onStart() {
        super.onStart()
        // DECLARING RECIPE OPERATIONS
        ro = RecipeOperations(ip, port)
        no = NetOperations(ip, port)
        val randomFragment = RandomFragment.newInstance(ro)
        openFragment(randomFragment)
    }

    private fun openFragment(fragment: Fragment) {
        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.main_frame, fragment)
        transaction.addToBackStack(null)
        transaction.commit()
    }

    private fun isHostReachable(): Boolean{
        return try {
            val sockaddr: SocketAddress = InetSocketAddress(ip, port)
            val sock = Socket()
            val timeoutMs = 10000
            sock.connect(sockaddr, timeoutMs)
            true
        }catch (e: Exception){
            false
        }
    }

    fun timedNetErrorsHandle(){
        if (!CONNECTED){
            var netError = NetError.newInstance()
            openFragment(netError)
        }/*else if (!HOST_REACHABLE){
            var hostError = hostError.newInstance()
            openFragment(hostError)
        }*/

        if (!CONNECTED || !HOST_REACHABLE){
            ro.abortRequests()
        }
    }

    fun timedConnectionCheck(){
        val delay: Long = 10
        val period: Long = 5000
        val task = Timer()
        task.scheduleAtFixedRate(object : TimerTask() {
            override fun run(){
                CONNECTED = isInetConnected(this@MainActivity)
                //HOST_REACHABLE = isHostReachable()
                HOST_REACHABLE = true

                timedNetErrorsHandle()
            }
        }, delay, period)
    }

    fun writeCertificate(city: Int): File?{
        //VR
        if (city == 0){
            println(this@MainActivity.filesDir)
            var path = this@MainActivity.filesDir
            val letDirectory = File(path, "data/certificates/VR")
            letDirectory.mkdirs()
            var file = File(letDirectory, "cookIT-cert.crt")
            file.writeText("")
            file.appendText("-----BEGIN CERTIFICATE-----\n" +
                    "MIIFjzCCA3cCFCKSFsCkBk1y03D6XC7Sfd36N3lWMA0GCSqGSIb3DQEBCwUAMIGD\n" +
                    "MQswCQYDVQQGEwJJVDEOMAwGA1UECAwFSXRhbHkxDzANBgNVBAcMBlZlcm9uYTEP\n" +
                    "MA0GA1UECgwGQ29va0lUMQ8wDQYDVQQLDAZDb29rSVQxGTAXBgkqhkiG9w0BCQEW\n" +
                    "CmhlbGxvLmZha2UxFjAUBgNVBAMMDTE5Mi4xNjguMS4xMDQwHhcNMTkxMTEwMjIx\n" +
                    "OTI2WhcNMjAxMTA5MjIxOTI2WjCBgzELMAkGA1UEBhMCSVQxDjAMBgNVBAgMBUl0\n" +
                    "YWx5MQ8wDQYDVQQHDAZWZXJvbmExDzANBgNVBAoMBkNvb2tJVDEPMA0GA1UECwwG\n" +
                    "Q29va0lUMRkwFwYJKoZIhvcNAQkBFgpoZWxsby5mYWtlMRYwFAYDVQQDDA0xOTIu\n" +
                    "MTY4LjEuMTA0MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA9bcqOAs3\n" +
                    "dZLpOu2qDRFqLzQz9i9ndupf/RqmXyH2W2A6IQVZsGeMFX3U5P4JrW215NTl3qHb\n" +
                    "PMCl7FJ/6sLP9R3QkLpK8lD4ApINzapO2pJpl5mr70BZUWS1cid0YxCamTQPzFpc\n" +
                    "SqTwEDvVIfVAppmhFf/bK4XEvk6RUxSTkJrCOpmHlel+ZM/Kd0vBokAYBdeeqwHQ\n" +
                    "a+AEO6GvJna+Too/FcfZgmVw0pc0tA2HTgkNXlEGD6T1yeTnKPLQWk50ydq4QIMv\n" +
                    "gfWgplLI/ZhD4QTlmTXPxnDNdk957VlERbeOhAXSUjoz8UqVEt2JLjz+Me7GBbYj\n" +
                    "WDYBEkPWKGibha6Narz71rP6RzZ+2FFoA+UKH31ZdNAsAtjgbWmlVnfoYAGm3pxQ\n" +
                    "8CSMP352ngEb0l0lXLPzhaCVEcdl1rMZg0GN0wig2PuEhPLdoS7kc36JyitOncpZ\n" +
                    "79m3iU1toUC1PPhkJb3LcfzNY6CN8FFTZRXbWo1TZbLsfyuN/vWYJqeVrOO0ExeV\n" +
                    "hN42AUPE2Zl6j5bvNyf2FpmYXWVi0I2cYX4fZEi5gfeHhTCygEX0+G0Cdp9MBHol\n" +
                    "UDhg/0TUvdkEqNiI+/LkKKwvx1dgl3HBpOnBHIjAyN091kiIjYMQl/EERvl3hkFZ\n" +
                    "4HM2Pr1boSX/2wxOpLJXwLD1QKLFYpPbVYECAwEAATANBgkqhkiG9w0BAQsFAAOC\n" +
                    "AgEAWQk3tTw/xubTLYNA0awn0+/3hJNVGnjtTWzcGMmvE+YRI9GBnN+X84pkrSPc\n" +
                    "uW9OrCLCzuY2y0e2QmK92LOOS3EGBUrpVxvJMmUYKr6tdmI0wkl4jbKhXmMt2OoQ\n" +
                    "JzBvJ0Wx+YeFcfj4xQQnuIXpYG+ofeRKcHF4p0qmwdE5jGb4cmbkKP6pydH8n4bv\n" +
                    "zVLkGlR1Jrw+91vNGJKZDxQkwpmykHWEMf03oQSqwGlcbuC2bt629YfnREubWLCs\n" +
                    "qpYKmbPNeJaXJbpydrj0hvXpkElx8sJUkGBnCi9Yz39rj6awHs2iN+HZqhe4rVbx\n" +
                    "Vqpem1UaQvY+3LE6juUidpNqZi/1StA6Tilxkjc1N6L3GszJFXpKmL1H18GYq9UF\n" +
                    "v+jrZGNM3Qlt9venw6lfHFYNdbDkj/Cf7GDqDjir5qmTT/QdlLJm7EHMZhZSiQUS\n" +
                    "xsbBUqEHOy0o0od9ILunj6UKifSbeLscO5bJuCAN8GZurUCopDo7s5lty4EkuZlN\n" +
                    "svJ5JwQKPg1PnQbTBApBptImZ9nPHQmP0qeCekK8/tlk8iGuJT2bh0OIO+cR9CJO\n" +
                    "AY14nVtOU9vJfhWe8LxnN7ptTNBg1NmgEQM2SyGego/ye/D+vRWOhQRhKt7eeRHR\n" +
                    "+8KWKYuNtCtZfe2jwPDJdutXKpP49Y4XwXVbf+gz3xrGp5Q=\n" +
                    "-----END CERTIFICATE-----\n")

            return letDirectory
        }
        //TN
        if (city == 1){
            println(this@MainActivity.filesDir)
            var path = this@MainActivity.filesDir
            val letDirectory = File(path, "data/certificates/TN")
            letDirectory.mkdirs()
            var file = File(letDirectory, "cookIT-cert.crt")
            file.writeText("")
            file.appendText("-----BEGIN CERTIFICATE-----\n" +
                    "MIIDXzCCAkegAwIBAgIUcP8eAF7egGbw5mxNv3O8bPAWrpowDQYJKoZIhvcNAQEL\n" +
                    "BQAwPzELMAkGA1UEBhMCSVQxDjAMBgNVBAgMBUl0YWx5MQ8wDQYDVQQHDAZWZXJv\n" +
                    "bmExDzANBgNVBAoMBkNvb2tJVDAeFw0xOTEyMTYxMDA3MTlaFw0yMTEyMTUxMDA3\n" +
                    "MTlaMD8xCzAJBgNVBAYTAklUMQ4wDAYDVQQIDAVJdGFseTEPMA0GA1UEBwwGVmVy\n" +
                    "b25hMQ8wDQYDVQQKDAZDb29rSVQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\n" +
                    "AoIBAQDTjM4bmAMbF+XShHWVGYCMMwSnWWrbtSivbfVGj09347uDECKiVEU9xQIh\n" +
                    "kCHq21n23l2RpmOM7Ov4d3aDR0OrNffXucqNlqCXWtJIdxPOoiLeD8le4+GieryU\n" +
                    "1SdHnMso2p6gUDj+zGzpVK9LkmHyFkvWSklWE3pOiSWm8HdxI1ytpYqCJkhh0UgQ\n" +
                    "+IAIVEgTuJuvvV7OXqFc2QGIX/PQIB9lNHQk1K+Wmd1ZWppIvXIQmfvNH+dfpwK/\n" +
                    "XrghtVnslGfiGxWMwJlqW+RfqebK/yNd/KsBnt9q3jz2cPGccYM5szNr3jOS8n1d\n" +
                    "lGGWMwfuWqJFUD9BonUWCKO9U9YLAgMBAAGjUzBRMB0GA1UdDgQWBBR/Y0TAZ3Qb\n" +
                    "Zzog8FKnIFrW/E3BmTAfBgNVHSMEGDAWgBR/Y0TAZ3QbZzog8FKnIFrW/E3BmTAP\n" +
                    "BgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQDGmcOrnGAvGheSoKws\n" +
                    "OrK9rozky+JBa8k4rTiifEvb/HhmUxJCeVkyeYMPdYISbHdG5wLKCkSsqJHfpJZV\n" +
                    "pNmCR/1acUq14zCgUlRdqVIVIV5rBkQO6V+18/4bUGo9uMPrC+Zjk0vS1lLyqNCY\n" +
                    "OL4TztRSkbmLGXHd70WSCmvFbGa/29N/xMyPrJATQR3bm1Q2va1wJiNJpNwduVnh\n" +
                    "YsYRSMHRpKdj3NdYMjPhrR1P8kq8uIfyMZ1glAeKIQ7phcNNN4mhEXCfbTJ1/13R\n" +
                    "AlCk/Z51Keyr00eZnXou5IBGP6ywCsQbPTx7JhVFkQ1NadscG4QLOACwPYnkdh3n\n" +
                    "1tEk\n" +
                    "-----END CERTIFICATE-----\n")
            return letDirectory
        }
        return null
    }

    private fun isInetConnected(context: Context):Boolean{
        val connectivityManager=context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val networkInfo=connectivityManager.activeNetworkInfo
        return  networkInfo!=null && networkInfo.isConnected
    }

}