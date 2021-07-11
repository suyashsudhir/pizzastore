package com.example.pizzabackend.pizzabackend.repository;

import com.example.pizzabackend.pizzabackend.models.UserCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository

public interface UserCredentialsRepository extends MongoRepository<UserCredentials, String> {



    public Optional<UserCredentials> findUserCredentialsByEmail(String email);
 @Query(value = "db.user_creds.updateOne({email:?0},{$set: {password:?1}})")
    void updatePassword(@Param("email") String email,@Param("password") String password);

}
