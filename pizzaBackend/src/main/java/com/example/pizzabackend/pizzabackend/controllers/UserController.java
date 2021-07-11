package com.example.pizzabackend.pizzabackend.controllers;

import com.example.pizzabackend.pizzabackend.models.*;
import com.example.pizzabackend.pizzabackend.repository.CartRepository;
import com.example.pizzabackend.pizzabackend.repository.UserCredentialsRepository;
import com.example.pizzabackend.pizzabackend.repository.UserInformationRepository;
import com.mongodb.MongoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {
    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    UserInformationRepository userInformationRepository;
    @Autowired
    UserCredentialsRepository userCredentialsRepository;

    @PostMapping("/updateInfo")
    ResponseEntity<?> updateUserInfo(@RequestBody UserInfoRequest request) {
        System.out.println(request);
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("email").is(request.getEmail()));
            Update update = new Update();
            update.set("profile_picture",request.getProfilePicture()).set("fullname",request.getName())
                    .set("address",request.getAddress()).set("phone",request.getPhone());
            mongoTemplate.findAndModify(query,update, UserInformation.class);
            return ResponseEntity.status(200).body("Updated");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("Server Error");
        }

    }

    @PostMapping("/updatePassword")
    ResponseEntity<?> updateUserPassword(@RequestBody PasswordUpdateRequest request) {
        System.out.println(request.toString() + "jasfhhsakgfldsaf");
        System.out.println(Arrays.toString(mongoTemplate.getCollectionNames().toArray()));
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        String passwordHash = encoder.encode(request.getNewPassword());
        int status = 200;
        String message = null;
        try {
            Optional<UserCredentials> credentials = userCredentialsRepository.findUserCredentialsByEmail(request.getEmail());
            if (credentials.isPresent()) {
                System.out.println(credentials.get().toString());
                boolean isValidPassword = encoder.matches(request.getPassword(), credentials.get().getPassword());
                System.out.println(isValidPassword);
                if (isValidPassword) {
                    System.out.println(request.getEmail());
                    System.out.println(passwordHash);
                    Query query = new Query();
                    query.addCriteria(Criteria.where("email").is(request.getEmail()));
                    System.out.println(mongoTemplate.find(query, UserCredentials.class));
                    Update update = new Update();
                    update.set("password",passwordHash);
                    mongoTemplate.findAndModify(query, update, UserCredentials.class);
                    System.out.println(mongoTemplate.findAndModify(query, update, UserCredentials.class));

                    status = 200;
                    message = "Updated";

                } else {
                    status = 200;
                    message = "invalid password";

                }
            }


        } catch (Exception exception) {
            status = 500;
            message = "Server Error";
            System.out.println(exception.getMessage() + exception.getCause());

        }
        return ResponseEntity.status(status).body(message);
    }

    @GetMapping("/orders")
    ResponseEntity<?> getOrders(@RequestParam("email") String email) {
        try {
            List<Order> order = cartRepository.findOrdersByEmail(email);
            return ResponseEntity.ok(order);
        } catch (MongoException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().body("Server Error");
        }
    }

}
