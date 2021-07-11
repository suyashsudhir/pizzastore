package com.example.pizzabackend.pizzabackend.service;

import com.example.pizzabackend.pizzabackend.models.UserCredentials;
import com.example.pizzabackend.pizzabackend.repository.UserCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service

public class UserCredentialsDetailsService implements UserDetailsService {
    @Autowired
    UserCredentialsRepository repository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<UserCredentials> userCredentials = repository.findUserCredentialsByEmail(s);

        if (userCredentials.isPresent()){
            UserCredentials credentials = userCredentials.get();
            return new User(credentials.getEmail(),credentials.getPassword(),new ArrayList<>());
        }
        else {
            throw new UsernameNotFoundException(String.format("%s not found",s));
        }
    }
}
