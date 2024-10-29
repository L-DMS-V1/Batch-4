package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private Integer userId;
    private String username;
    private String email;
    private String roleName;
}
