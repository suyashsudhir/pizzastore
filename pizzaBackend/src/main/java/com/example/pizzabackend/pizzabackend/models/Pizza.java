package com.example.pizzabackend.pizzabackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import java.util.*;

@Document(collection = "pizza")
@Data

@AllArgsConstructor

public class Pizza {
    @Id
    @Field(value = "id")
    private String id;

    @Field(value = "name")
    private String name;

    @Field(value = "description")
    private String description;
    @Field(value = "image")
    private String image;

    @Field(value = "isveg")
    private Boolean isVeg;

    @Field(value = "size")
    List<String> sizes;

    @Field(value = "spice_level")
    private String spiceLevel;

    @Field(value = "price")
    private Double price;
    @Field(value = "issides")
    private Boolean isSides;


    public Pizza(){
        
        sizes = List.of("small", "medium", "large");
    }
}
