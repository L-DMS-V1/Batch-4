package com.example.backend.controllers;

import com.example.backend.DTOs.CourseAssignmentDto;
import com.example.backend.DTOs.RequestFormDto;
import com.example.backend.DTOs.RequestFormResponse;
import com.example.backend.DTOs.UserDto;
import com.example.backend.models.*;
import com.example.backend.services.CourseService;
import com.example.backend.services.EmployeeService;
import com.example.backend.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.backend.utils.ValidationUtils.isEmptyField;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}, allowCredentials = "true")
public class ManagerController {
    @Autowired
    private RequestService requestService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private EmployeeService employeeService;
    @PostMapping("/request/create")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<?> createRequest(@RequestBody RequestFormDto requestFormDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Fields: " + bindingResult.getFieldErrors());
        }
        if (isEmptyField(requestFormDto.getCourseName()) ||
                isEmptyField(requestFormDto.getDescription()) ||
                isEmptyField(requestFormDto.getDuration()) ||
                isEmptyField(requestFormDto.getManagerId())||
                isEmptyField(requestFormDto.getRequiredEmployees())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: All required fields must be filled.");
        }
        try{
            RequestForm requestForm = requestService.submitRequest(requestFormDto);
            RequestFormResponse res = new RequestFormResponse("Request created Successfully", requestForm);
            System.out.println(requestFormDto.getRequiredEmployees().toString());
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }

    @GetMapping("/course/all")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<?> getAllCourses(){
        try{
            List<Course> courses = courseService.getAllCourses();
            return  ResponseEntity.status(HttpStatus.OK).body(courses);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: "+ e.getMessage());
        }
    }

    @GetMapping("employees/all")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<?> getAllEmployees(){
        try{
            List<UserDto> employees = employeeService.getAllEmployeeUsers();
            return  ResponseEntity.status(HttpStatus.OK).body(employees);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: "+ e.getMessage());
        }
    }


}
