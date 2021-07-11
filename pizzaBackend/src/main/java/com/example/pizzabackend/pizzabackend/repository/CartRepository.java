package com.example.pizzabackend.pizzabackend.repository;

import com.example.pizzabackend.pizzabackend.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends MongoRepository<Order, String> {

    List<Order> findOrdersByEmail(String email);


}
