package com.example.pizzabackend.pizzabackend.controllers;

import com.example.pizzabackend.pizzabackend.jwt.JWTTokenUtil;
import com.example.pizzabackend.pizzabackend.models.*;
import com.example.pizzabackend.pizzabackend.repository.UserCredentialsRepository;
import com.example.pizzabackend.pizzabackend.repository.UserInformationRepository;
import com.example.pizzabackend.pizzabackend.service.UserCredentialsDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Optional;

@CrossOrigin
@RestController
public class JWTController {
    @Autowired
    UserInformationRepository userInformationRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserCredentialsRepository userCredentialsRepository;
    @Autowired
    JWTTokenUtil tokenUtil;

    @Autowired
    UserCredentialsDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> createToken(@RequestBody JWTRequest jwtRequest)  {
        System.out.println(jwtRequest.toString());
        String password = jwtRequest.getPassword();
        final UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());

        Optional<UserCredentials> credentials = userCredentialsRepository.findUserCredentialsByEmail(jwtRequest.getUsername());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        if ((credentials.isPresent())){
            if (encoder.matches(password, userDetails.getPassword())) {
                long exp;
                if (jwtRequest.getRememberMe()) {
                    exp = 1296000 * 1000;

                } else {
                    exp = 3600 * 1000;
                }
                final String token = tokenUtil.generateToken(userDetails, exp);
                return ResponseEntity.ok(token);
            } else {

                return ResponseEntity.status(401).body("invalid credentials");
            }
        }
        else {
            return ResponseEntity.status(403).body("user not found");
        }





    }

    @PostMapping("/userSignup")
    public ResponseEntity<?> signUp(@RequestBody NewUserRequestBody requestBody)  {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

        UserInformation information = new UserInformation();
        information.setFullname(requestBody.getFullname());
        information.setEmail(requestBody.getEmail());
        UserInformation savedInformation = userInformationRepository.save(information);
        UserCredentials credentials = new UserCredentials();

        String passwordHash = encoder.encode(requestBody.getPassword());
        credentials.setEmail(requestBody.getEmail());
        credentials.setPassword(passwordHash);
        credentials.setUserId(savedInformation.getId());
        userCredentialsRepository.save(credentials);
        UserDetails userDetails = new User(requestBody.getEmail(), requestBody.getPassword(), new ArrayList<>());
        String token = tokenUtil.generateToken(userDetails,(1296000 * 1000));
        return ResponseEntity.status(201).body(token);


    }

    @GetMapping("/auth/checkAuth")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        String token = request.getHeader("authorization").substring(7);

        String email = tokenUtil.getUsernameFromJwt(token);
        UserInformation information = userInformationRepository.findUserInformationByEmail(email);
        AuthenticatedUserResponseModel responseModel = new AuthenticatedUserResponseModel(information, true);

        return ResponseEntity.status(200).body(responseModel);
    }

    @GetMapping("/userInfoFromOAuth")
    @ResponseBody
   Principal googleLogin(Principal principal,HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println(principal);
        response.sendRedirect("http://localhost:3000/");
        return   (principal);
    }

    @RequestMapping(value="/logout", method=RequestMethod.GET)
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "logged out";
    }
}
