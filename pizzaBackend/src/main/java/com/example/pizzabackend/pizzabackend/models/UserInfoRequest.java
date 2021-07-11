package com.example.pizzabackend.pizzabackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoRequest implements Serializable {
    private String id;
    private String profilePicture;
    private String phone;
    private String name;
    private String address;
    private String email;
}
