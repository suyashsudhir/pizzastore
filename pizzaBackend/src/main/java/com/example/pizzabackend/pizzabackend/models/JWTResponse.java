package com.example.pizzabackend.pizzabackend.models;

import lombok.Data;

import java.io.Serializable;
@Data
public class JWTResponse implements Serializable {
    private final String jwtToken;
}
