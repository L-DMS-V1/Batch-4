package com.example.backend.services;

import com.example.backend.DTOs.UserRegistrationDTO;
import com.example.backend.models.Role;
import com.example.backend.models.User;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public ResponseEntity<?> registerUser(UserRegistrationDTO userRegistrationDTO){

        Role role = roleRepository.findByRoleName(userRegistrationDTO.getRole());
        if (role == null) {
            throw new IllegalArgumentException("Role not found: " + userRegistrationDTO.getRole());
        }
        if(userRepository.existsByUsername(userRegistrationDTO.getUsername())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists.");
        }
        User user = new User();
        user.setUsername(userRegistrationDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        user.setEmail(userRegistrationDTO.getEmail());

        user.setRole(role);

        User user1 =  userRepository.save(user);
        return ResponseEntity.ok(user1);
    }
}
