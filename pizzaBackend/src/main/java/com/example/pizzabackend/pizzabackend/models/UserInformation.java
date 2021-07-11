package com.example.pizzabackend.pizzabackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Data
@AllArgsConstructor
@Document(collection = "user_info")
public class UserInformation implements Serializable {
    @Id
    @Field(value = "id")
    private String id;

    @Field(value = "fullname")
    private String fullname;

    @Field("phone")
    private String phone;

    @Field("email")
    private String email;

    @Field("profile_picture")
    private String profilePicture;

    @Field(value = "address")
    private String address;

    public UserInformation()  {

        phone = "";
        profilePicture = "";
        address = "";
    }


}
