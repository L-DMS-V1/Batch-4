package com.example.backend.controllers;

import com.example.backend.DTOs.CourseCreationResponse;
import com.example.backend.DTOs.CourseDto;
import com.example.backend.models.Course;
import com.example.backend.models.RequestForm;
import com.example.backend.services.CourseService;
import com.example.backend.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.backend.utils.ValidationUtils.isEmptyField;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private RequestService requestService;
    @Autowired
    private CourseService courseService;
    @GetMapping("/request/all")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> findAllRequestsMade(){
        try{
            List<RequestForm> requestForms = requestService.getAllRequests();
            return ResponseEntity.status(HttpStatus.OK).body(requestForms);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }

    @PostMapping("/course/create")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> createCourse(@RequestBody CourseDto courseDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Fields: " + bindingResult.getFieldErrors());
        }
        if (isEmptyField(courseDto.getCourseName()) ||
                isEmptyField(courseDto.getOutcomes()) ||
                isEmptyField(courseDto.getDuration()) ||
                isEmptyField(courseDto.getKeyConcepts())||
                isEmptyField(courseDto.getResourceLinks())
        ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: All required fields must be filled.");
        }
        try{
            Course course = courseService.createCourse(courseDto);
            CourseCreationResponse res = new CourseCreationResponse(course, "Course created successfully.");
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }
}
