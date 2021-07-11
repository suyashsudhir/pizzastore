package com.example.pizzabackend.pizzabackend.jwt;

import com.example.pizzabackend.pizzabackend.service.JWTUserDetailsService;
import com.example.pizzabackend.pizzabackend.service.UserCredentialsDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component

public class JWTRequestFilter extends OncePerRequestFilter {

    @Autowired
    JWTTokenUtil jwtTokenUtil;
    @Autowired
    private UserCredentialsDetailsService jwtUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String requestHeader = request.getHeader("authorization");

        String username = null;
        String token = null;

        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            token = requestHeader.substring(7);

            try {
                username = jwtTokenUtil.getUsernameFromJwt(token);


            } catch (IllegalArgumentException exception) {
                System.out.println("Unable to get jwt " + exception.getMessage());
            } catch (ExpiredJwtException expiredJwtException) {
                System.out.println("JWT expired " + expiredJwtException.getMessage());
            }
        } else {
            logger.warn("Jwt not present");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
            if (jwtTokenUtil.validateToken(token, userDetails)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }

        }
        filterChain.doFilter(request, response);


    }
}
