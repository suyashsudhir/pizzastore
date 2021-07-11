package com.example.pizzabackend.pizzabackend.models;

import lombok.Data;

@Data
public class NewUserRequestBody {
    private String email;
    private String password;
    private String fullname;
}
