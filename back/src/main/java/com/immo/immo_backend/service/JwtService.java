package com.immo.immo_backend.service;

import com.immo.immo_backend.model.User;
import com.immo.immo_backend.model.Agency;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.access-secret}")
    private String accessTokenSecret;

    @Value("${jwt.refresh-secret}")
    private String refreshTokenSecret;

    public String generateAccessToken(User user) {
        return Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15))
                .signWith(SignatureAlgorithm.HS256, accessTokenSecret.getBytes())
                .compact();
    }

    public String generateAccessToken(Agency agency) {
        return Jwts.builder()
                .setSubject(String.valueOf(agency.getId()))
                .claim("role", "AGENCY")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15))
                .signWith(SignatureAlgorithm.HS256, accessTokenSecret.getBytes())
                .compact();
    }

    public String generateRefreshToken(User user) {
        return Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7))
                .signWith(SignatureAlgorithm.HS256, refreshTokenSecret.getBytes())
                .compact();
    }

    public String generateRefreshToken(Agency agency) {
        return Jwts.builder()
                .setSubject(String.valueOf(agency.getId()))
                .claim("role", "AGENCY")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7))
                .signWith(SignatureAlgorithm.HS256, refreshTokenSecret.getBytes())
                .compact();
    }

    public String extractUserId(String token) {
        return Jwts.parser()
                .setSigningKey(accessTokenSecret.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractUserIdFromRefreshToken(String token) {
        return Jwts.parser()
                .setSigningKey(refreshTokenSecret.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser()
                .setSigningKey(accessTokenSecret.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }

    public boolean isRefreshTokenExpired(String token) {
        Date expiration = Jwts.parser()
                .setSigningKey(refreshTokenSecret.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}