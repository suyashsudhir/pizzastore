package com.example.pizzabackend.pizzabackend.repository;


import com.example.pizzabackend.pizzabackend.models.Pizza;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PizzaRepository extends MongoRepository<Pizza, String> {
}
