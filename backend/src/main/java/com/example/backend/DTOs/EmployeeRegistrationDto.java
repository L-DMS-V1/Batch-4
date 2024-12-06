package com.example.backend.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmployeeRegistrationDto {
    @NotBlank(message = "Username is required.")
    private String username;
    @NotBlank(message = "Password is required.")
    private String password;
    @Email(message = "Please provide a valid email.")
    @NotBlank(message = "Email is required.")
    private String email;
    @NotBlank(message = "Role is required.")
    private String role;
    @NotBlank(message = "Manager is required.")
    private Integer managerId;
}
