package com.ecommerce.userservice.util;

import com.ecommerce.common.security.JwtClaims;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private final Key key;
    private final long expirationMillis;
    private final String issuer;

    public JwtUtil(JwtProperties props) {
        if (props.getSecretBase64() == null || props.getSecretBase64().isBlank()) {
            throw new IllegalStateException("JWT secret (jwt.secret-base64) not configured");
        }
        this.key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(props.getSecretBase64()));
        this.expirationMillis = props.getExpirationMillis();
        this.issuer = props.getIssuer();
    }

    public String generateToken(
            Long userId,
            Long storeId,
            String username,
            Set<String> roles
    ) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuer(issuer)
                .setIssuedAt(now)
                .setExpiration(exp)
                .claim(JwtClaims.USERNAME, username)
                .claim(JwtClaims.STORE_ID, storeId)
                .claim(JwtClaims.ROLES, List.copyOf(roles))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = parse(token);
            return issuer.equals(claims.getIssuer());
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public Claims parse(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .requireIssuer(issuer)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Long getUserId(String token) {
        String sub = parse(token).getSubject();
        return sub == null ? null : Long.valueOf(sub);
    }

    public String getUsername(String token) {
        return parse(token).get(JwtClaims.USERNAME, String.class);
    }

    public Long getStoreId(String token) {
        return parse(token).get(JwtClaims.STORE_ID, Long.class);
    }

    public Set<String> getRoles(String token) {
        Object raw = parse(token).get(JwtClaims.ROLES);

        if (raw instanceof Collection<?> list) {
            return list.stream()
                    .filter(Objects::nonNull)
                    .map(Object::toString)
                    .collect(Collectors.toUnmodifiableSet());
        }
        return Set.of();
    }
    
    public long getExpirationMillis() {
        return expirationMillis;
    }
}
