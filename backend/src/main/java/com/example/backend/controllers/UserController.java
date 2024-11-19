package com.example.backend.controllers;

import com.example.backend.DTOs.JwtResponse;
import com.example.backend.DTOs.UserLoginDto;
import com.example.backend.DTOs.UserRegistrationDTO;
import com.example.backend.models.User;
import com.example.backend.services.AdminService;
import com.example.backend.services.EmployeeService;
import com.example.backend.services.ManagerService;
import com.example.backend.services.UserService;
import com.example.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
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
    private EmployeeService employeeService;
    @Autowired
    private ManagerService managerService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private JwtUtil jwtUtil;

    // For User Registration
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
        JwtResponse res = new JwtResponse();
        res.setEmail(user.getEmail());
        res.setUsername(user.getUsername());
        res.setToken(token);
        res.setRole(user.getRole().getRoleName());
        if(user.getRole().getRoleName().matches("Employee")) {
            res.setId(employeeService.findEmployeeByUserId(user.getUserId()));
        }else if(user.getRole().getRoleName().matches("Manager")){
            res.setId(managerService.findManagerByUserId(user.getUserId()));
        }else if(user.getRole().getRoleName().matches("Admin")){
            res.setId(adminService.findAdminByUserId(user.getUserId()));
        }else{
            res.setId(-1);
        }

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
    // For Role Based Authentication

    @GetMapping("/employee/resource")
    @PreAuthorize("hasRole('Employee')")
    public ResponseEntity<String> employeeResource() {
        return ResponseEntity.ok("Accessible to Employees");
    }

    @GetMapping("/manager/resource")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<String> managerResource() {
        return ResponseEntity.ok("Accessible to Managers");
    }

    @GetMapping("/admin/resource")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<String> adminResource() {
        return ResponseEntity.ok("Accessible to Admins");
    }
}
