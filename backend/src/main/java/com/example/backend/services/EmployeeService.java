package com.example.backend.services;

import com.example.backend.DTOs.UserDto;
import com.example.backend.models.Employee;
import com.example.backend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public Optional<Employee> findEmployee(Integer employeeId) {
        return employeeRepository.findById(employeeId);
    }

    public Integer findEmployeeByUserId(int userId) {
        Employee employee = employeeRepository.findByUserId(userId);

        if (employee == null) {
            throw new RuntimeException("No employee found for userId: " + userId);
        }
        return employee.getEmployeeId();
    }

    public List<UserDto> getAllManagedEmployeeUsers(Integer managerId) {
        return employeeRepository.findAll().stream()
                .filter(employee -> employee.getManager().getManagerId()==managerId) // Filter by managerId
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
