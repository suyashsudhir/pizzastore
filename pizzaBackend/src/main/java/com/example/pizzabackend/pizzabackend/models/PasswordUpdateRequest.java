package com.example.pizzabackend.pizzabackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordUpdateRequest implements Serializable {
    private String userid;
    private String password;
    private String email;
    private String newPassword;
}
