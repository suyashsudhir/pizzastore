package com.example.pizzabackend.pizzabackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticatedUserResponseModel implements Serializable {
    private UserInformation information;
    private  Boolean isAuthenticated;
}
