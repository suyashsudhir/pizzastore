package com.example.pizzabackend.pizzabackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor

@Document(collection = "orders")

public class Order implements Serializable {
    @Id
    private String id;
    private long total;
    private String email;
    private String address;
    private List<CartItem> pizzaList;
    private String phone;
    private Date created;

    public  Order(){
        created = Date.from(Instant.now());
    }


}
