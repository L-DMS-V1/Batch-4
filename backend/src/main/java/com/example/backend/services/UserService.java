package com.example.backend.services;

import com.example.backend.DTOs.UserRegistrationDTO;
import com.example.backend.models.Admin;
import com.example.backend.models.Employee;
import com.example.backend.models.Manager;
import com.example.backend.models.Role;
import com.example.backend.models.User;
import com.example.backend.repositories.AdminRepository;
import com.example.backend.repositories.EmployeeRepository; // Import EmployeeRepository
import com.example.backend.repositories.ManagerRepository; // Import ManagerRepository
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

    @Autowired
    private AdminRepository adminRepository; // Inject AdminRepository
    @Autowired
    private ManagerRepository managerRepository; // Inject ManagerRepository
    @Autowired
    private EmployeeRepository employeeRepository; // Inject EmployeeRepository

    public ResponseEntity<?> registerUser(UserRegistrationDTO userRegistrationDTO) {
        Role role = roleRepository.findByRoleName(userRegistrationDTO.getRole());
        if (role == null) {
            throw new IllegalArgumentException("Role not found: " + userRegistrationDTO.getRole());
        }

        if (userRepository.existsByUsername(userRegistrationDTO.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists.");
        }

        User user = new User();
        user.setUsername(userRegistrationDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        user.setEmail(userRegistrationDTO.getEmail());
        user.setRole(role);

        // Save the user
        User savedUser = userRepository.save(user);

        // Save to the appropriate repository based on the role
        switch (role.getRoleName()) {
            case "Admin":
                Admin admin = new Admin();
                admin.setUser(savedUser); // Link the admin to the saved user
                adminRepository.save(admin); // Save the Admin entry
                break;

            case "Manager":
                Manager manager = new Manager();
                manager.setUser(savedUser); // Link the manager to the saved user
                managerRepository.save(manager); // Save the Manager entry
                break;

            case "Employee":
                Employee employee = new Employee();
                employee.setUser(savedUser); // Link the employee to the saved user
                employeeRepository.save(employee); // Save the Employee entry
                break;

            default:
                throw new IllegalArgumentException("Invalid role: " + role.getRoleName());
        }

        return ResponseEntity.ok(savedUser);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
