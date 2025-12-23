package com.ecommerce.userservice.util;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {
    /**
     * Base64 encoded secret key (for HS256). Must be at least 256 bits (32 bytes)
     * Example generator: openssl rand -base64 32
     */
    private String secretBase64;
    private long expirationMillis = 3600000; // 1 hour default
    private String issuer = "example-ecommerce";

    public String getSecretBase64() { return secretBase64; }
    public void setSecretBase64(String secretBase64) { this.secretBase64 = secretBase64; }
    public long getExpirationMillis() { return expirationMillis; }
    public void setExpirationMillis(long expirationMillis) { this.expirationMillis = expirationMillis; }
    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }
}
