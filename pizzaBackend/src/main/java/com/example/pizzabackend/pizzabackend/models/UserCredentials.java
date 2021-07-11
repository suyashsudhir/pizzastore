package com.example.pizzabackend.pizzabackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.UUID;

@Data

@AllArgsConstructor
@Document(collection = "user_creds")
public class UserCredentials implements UserDetails, Serializable {
    @Id
    @Field(value = "id")
    private String id;

    @Field(value = "userid")
    private String userId;

    @Field(value = "email")
    private String email;

    @Field(value = "password")
    private String password;

    @Field(value = "is_enabled")
    private Boolean isEnabled;


    @Field(value = "is_locked")
    private Boolean isLocked;


    public UserCredentials(){

        isEnabled = true;
        isLocked = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
