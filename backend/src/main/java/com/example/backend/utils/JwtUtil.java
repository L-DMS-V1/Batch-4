package com.example.backend.utils;

import com.example.backend.models.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;

@Component
public class JwtUtil {
    private String jwtSecretKey = "infosys";
    private int lifeTime = 3600000;
    public String generateToken(User user){
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + lifeTime))
                .signWith(SignatureAlgorithm.HS512, jwtSecretKey)
                .compact();
    }
}