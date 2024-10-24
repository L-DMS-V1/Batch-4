package com.example.backend.controllers;

import com.example.backend.DTOs.JwtResponse;
import com.example.backend.DTOs.UserLoginDto;
import com.example.backend.DTOs.UserRegistrationDTO;
import com.example.backend.models.User;
import com.example.backend.services.UserService;
import com.example.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
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

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDto loginDto){
        User user = userService.findByUsername(loginDto.getUsername());
        if(user == null || !passwordEncoder.matches(loginDto.getPassword(), user.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
        String token = jwtUtil.generateToken(user);
        return ResponseEntity.status(HttpStatus.OK).body(new JwtResponse(token));
    }
}
