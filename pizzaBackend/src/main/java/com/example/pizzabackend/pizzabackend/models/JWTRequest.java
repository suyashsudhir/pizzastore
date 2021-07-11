package com.example.pizzabackend.pizzabackend.models;

import lombok.Data;

import java.io.Serializable;

@Data
public class JWTRequest implements Serializable {
    private final String username;
    private final String password;
    private final Boolean rememberMe;

}
