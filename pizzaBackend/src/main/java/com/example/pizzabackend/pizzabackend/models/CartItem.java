package com.example.pizzabackend.pizzabackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem implements Serializable {
    private String crust;
    private String id;
    private int price;
    private String size;
    private String name;
    private int quantity;

}
