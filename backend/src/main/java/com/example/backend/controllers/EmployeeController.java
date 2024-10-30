package com.example.backend.controllers;

import com.example.backend.models.CourseAssignment;
import com.example.backend.models.CourseProgress;
import com.example.backend.models.Employee;
import com.example.backend.services.CourseService;
import com.example.backend.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private CourseService courseService;
    @GetMapping("/{employeeId}/assignments/all")
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
    @PostMapping("/{employeeId}/assignments/{assignmentId}/start")
    @PreAuthorize("hasRole('Employee')")
    public ResponseEntity<?> startAssignment(@PathVariable Integer employeeId, @PathVariable Integer assignmentId){
        Optional<Employee> employee = employeeService.findEmployee(employeeId);
        if(employee == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee not found with ID: "+ employeeId);
        }
        Optional<CourseAssignment> assignment = courseService.findAssignmentByAssignmentId(assignmentId);
        if(assignment.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Assignment not found with ID: "+ assignmentId);
        }

        try{
            CourseProgress progress = courseService.initiateProgressRecord(assignment.get());
            return ResponseEntity.status(HttpStatus.CREATED).body(progress);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }
}
