package com.example.pizzabackend.pizzabackend.controllers;

import com.example.pizzabackend.pizzabackend.models.CartRequestBody;
import com.example.pizzabackend.pizzabackend.models.Order;
import com.example.pizzabackend.pizzabackend.models.Pizza;
import com.example.pizzabackend.pizzabackend.repository.CartRepository;
import com.example.pizzabackend.pizzabackend.repository.PizzaRepository;

import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/common")
public class CommonController {

    @Autowired
    PizzaRepository pizzaRepository;
    @Autowired
    CartRepository cartRepository;
    @GetMapping("/test")
    public ResponseEntity<List<Pizza>> index(){
        return new ResponseEntity<>(pizzaRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/addpizza")
    public ResponseEntity<Pizza> addPizzas(@RequestBody Pizza pizza){
        Pizza newPizza = pizzaRepository.save(pizza);

        return new ResponseEntity<>(newPizza, HttpStatus.CREATED);
    }

    @PostMapping("/neworder")
    public ResponseEntity<Order> addOrder(@RequestBody Order cart){
        Order newOrder = cartRepository.save(cart);

        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @PostMapping("/create-stripe-checkout")
    public ResponseEntity<?> stripeCheckout(@RequestBody CartRequestBody cartBody) throws StripeException {
        System.out.println(cartBody);
        Stripe.apiKey = "sk_test_51GqZSqEEHfWdM3EZ4kaQRaAViBiGO0ijY3h3Ti5ZiXLLu7kAL32sN1qjtUxZylc9oUSNwplJzkao8eUNHZXgLkY400oywReevq";
        final String DOMAIN = "http://localhost:3000/";

        Session session = new Session();
        try {
            SessionCreateParams params = SessionCreateParams.builder().addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD).setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(DOMAIN+"success").setCancelUrl(DOMAIN + "cancel").setCustomerEmail(cartBody.getEmail()).addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L).setCurrency("inr").setAmount(cartBody.getTotal() * 100).setName("POizaa")
                                    .build()
                    )
                    .build();



           session = Session.create(params);

        } catch (CardException exception){
            session.setUrl(DOMAIN + "paymenterror");
        }



        return ResponseEntity.ok(session.getUrl());
    }


}
