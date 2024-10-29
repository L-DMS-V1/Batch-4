package com.example.backend.controllers;

import com.example.backend.models.CourseAssignment;
import com.example.backend.models.Employee;
import com.example.backend.services.CourseService;
import com.example.backend.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private CourseService courseService;
    @GetMapping("{employeeId}/assignments/all")
    @PreAuthorize("hasRole('Employee')")
    public ResponseEntity<?> getAllCourseAssignments(@PathVariable Integer employeeId){
        Optional<Employee> employee = employeeService.findEmployee(employeeId);
        if(employee == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee not found with ID: "+ employeeId);
        }
        try {
            List<CourseAssignment> assignments = courseService.findCourseAssignmentsByEmployee(employee);
            return ResponseEntity.status(HttpStatus.OK).body(assignments);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }
}
