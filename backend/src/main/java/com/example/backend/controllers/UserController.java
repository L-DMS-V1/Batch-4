package com.example.backend.controllers;

import com.example.backend.DTOs.UserRegistrationDTO;
import com.example.backend.models.User;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.backend.utils.ValidationUtils.isEmptyField;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<?> registerNewUser(@RequestBody UserRegistrationDTO userRegistrationDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Fields: " + bindingResult.getFieldErrors());
        }
        if (isEmptyField(userRegistrationDto.getUsername()) ||
                isEmptyField(userRegistrationDto.getPassword()) ||
                isEmptyField(userRegistrationDto.getEmail()) ||
                isEmptyField(userRegistrationDto.getRole())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: All required fields must be filled.");
        }
        try{
            return userService.registerUser(userRegistrationDto);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration: " + e.getMessage());
        }
    }
}
