package com.ecommerce.apigateway.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private final Key key;
    private final String issuer;

    public JwtUtil(JwtProperties props) {
        this.key = Keys.hmacShaKeyFor(
                Base64.getDecoder().decode(props.getSecretBase64())
        );
        this.issuer = props.getIssuer();
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .requireIssuer(issuer)
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validate(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException ex) {
            return false;
        }
    }

    public Long getUserId(String token) {
        return getClaims(token).get("userId", Long.class);
    }

    public String getUsername(String token) {
        return getClaims(token).get("username", String.class);
    }

    public Long getStoreId(String token) {
        return getClaims(token).get("storeId", Long.class);
    }

    public Set<String> getRoles(String token) {
        Object raw = getClaims(token).get("roles");
        if (raw instanceof List<?> list) {
            return list.stream().map(Object::toString).collect(Collectors.toSet());
        }
        return Set.of();
    }
}
