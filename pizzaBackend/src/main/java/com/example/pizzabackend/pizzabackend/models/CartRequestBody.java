package com.example.pizzabackend.pizzabackend.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor

public@NoArgsConstructor
class CartRequestBody  implements Serializable {
    private long total;
    private String email;
    private String address;
    private List<CartItem> pizzaList;
    private String phone;

}
