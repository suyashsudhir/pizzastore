package com.example.pizzabackend.pizzabackend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTTokenUtil implements Serializable {


    @Value(value = "${jwt.secret}")
    private String secret;


    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsTFunction.apply(claims);
    }

    public String getUsernameFromJwt(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromJwt(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromJwt(token);
        return expiration.before(new Date());
    }


    public String createToken(Map<String, Object> claims, String subject, long exp) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + exp))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    public String generateToken(UserDetails userDetails, long exp) {
        Map<String, Object> claims = new HashMap<>();
        String username = userDetails.getUsername();
        return createToken(claims, username, exp);

    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromJwt(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));

    }
}
