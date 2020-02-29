package com.example.cookit

import java.io.BufferedInputStream
import java.io.File
import java.io.FileInputStream
import java.io.InputStream
import java.nio.file.Path
import java.security.KeyStore
import java.security.cert.CertificateFactory
import java.security.cert.X509Certificate
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManagerFactory

class SSLContextGenerator (){
    init {
    }
    fun createCTX(path: File): SSLContext{
        var context: SSLContext

        val cf: CertificateFactory = CertificateFactory.getInstance("X.509")
        val caInput: InputStream =
            BufferedInputStream(FileInputStream(File(path, "cookIT-cert.crt")))
        val ca: X509Certificate = caInput.use {
            cf.generateCertificate(it) as X509Certificate
        }

        // Create a KeyStore containing our trusted CAs
        val keyStoreType = KeyStore.getDefaultType()
        val keyStore = KeyStore.getInstance(keyStoreType).apply {
            load(null, null)
            setCertificateEntry("ca", ca)
        }

        // Create a TrustManager that trusts the CAs inputStream our KeyStore
        val tmfAlgorithm: String = TrustManagerFactory.getDefaultAlgorithm()
        val tmf: TrustManagerFactory = TrustManagerFactory.getInstance(tmfAlgorithm).apply {
            init(keyStore)
        }

        // Create an SSLContext that uses our TrustManager
        context = SSLContext.getInstance("TLS").apply {
            init(null, tmf.trustManagers, null)
        }
        return context
    }
}
