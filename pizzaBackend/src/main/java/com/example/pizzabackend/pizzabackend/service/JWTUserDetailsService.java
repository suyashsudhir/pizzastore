package com.example.pizzabackend.pizzabackend.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JWTUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.equalsIgnoreCase("admin")){
            return new User("admin","$2y$12$/PI4mqYOGKuSxRJcsUUwpeAJTsrYJvPqXj2kjyP7Fu4GkaFKka1sS", new ArrayList<>());
        }
        else {
            throw new UsernameNotFoundException(String.format("%s not found ", username));
        }
    }
}
