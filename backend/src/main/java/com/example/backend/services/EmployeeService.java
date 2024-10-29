package com.example.backend.services;

import com.example.backend.DTOs.UserDto;
import com.example.backend.models.Employee;
import com.example.backend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<UserDto> getAllEmployeeUsers() {
        return employeeRepository.findAll().stream()
                .map(employee -> {
                    var user = employee.getUser();
                    return new UserDto(
                            user.getUserId(),
                            user.getUsername(),
                            user.getEmail(),
                            user.getRole().getRoleName()
                    );
                })
                .collect(Collectors.toList());
    }
}
