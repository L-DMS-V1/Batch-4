package com.example.backend.services;

import com.example.backend.Config.JwtConfig;
import com.example.backend.DTOs.UserRegistrationDTO;
import com.example.backend.models.Admin;
import com.example.backend.models.Employee;
import com.example.backend.models.Manager;
import com.example.backend.models.Role;
import com.example.backend.models.User;
import com.example.backend.repositories.AdminRepository;
import com.example.backend.repositories.EmployeeRepository;
import com.example.backend.repositories.ManagerRepository;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

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
    private AdminRepository adminRepository;
    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    
        private JwtConfig jwtConfig;
    
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
    
            User savedUser = userRepository.save(user);
    
            switch (role.getRoleName()) {
                case "Admin":
                    Admin admin = new Admin();
                    admin.setUser(savedUser);
                    adminRepository.save(admin);
                    break;
    
                case "Manager":
                    Manager manager = new Manager();
                    manager.setUser(savedUser);
                    managerRepository.save(manager);
                    break;
    
                case "Employee":
                    Employee employee = new Employee();
                    employee.setUser(savedUser);
                    employeeRepository.save(employee);
                    break;
    
                default:
                    throw new IllegalArgumentException("Invalid role: " + role.getRoleName());
            }
    
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    
        public User findByUsername(String username) {
            return userRepository.findByUsername(username);
        }
    
        @Autowired
        public UserService(JwtConfig jwtConfig) {
            this.jwtConfig = jwtConfig;
    }

    public String getJwtSecret() {
        return jwtConfig.getSecret();
    }
    //@Value("${jwt.secret}")
    private String jwtSecret; 
    // UserService.java (assuming it contains JWT utilities)
    public String getRoleFromToken(String token) {
         //byte[] jwtSecret;
        Claims claims = Jwts.parser()
        .setSigningKey(jwtSecret)  // jwtSecret is your signing key
        .parseClaimsJws(token)
        .getBody();
    return claims.get("role", String.class); // assuming role is stored in token
}
public String getUsernameFromToken(String token) {
    Claims claims = Jwts.parser()
        .setSigningKey(jwtSecret)
        .parseClaimsJws(token)
        .getBody();
    return claims.getSubject(); // Assuming the username is stored in the "sub" (subject) field
}
public boolean validateToken(String token) {
    try {
        Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
        return true;
    } catch (Exception e) {
        // Log token validation error here, if necessary
        return false;
    }
}

}
