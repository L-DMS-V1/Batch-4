package com.example.backend.controllers;

import com.example.backend.DTOs.AssignmentResponseDto;
import com.example.backend.models.Course;
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
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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
    @PostMapping("/assignments/{progressId}/complete")
    @PreAuthorize("hasRole('Employee')")
    public ResponseEntity<?> completeAssignment(
            @PathVariable Integer progressId) {
        try {

//            courseService.completeAssignment(progressId, assignmentId, progressPercentage, status);
            return ResponseEntity.ok("Course marked as completed successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error completing course: " + e.getMessage());
        }
    }

    @GetMapping("/assignment/{assignmentId}")
    @PreAuthorize("hasRole('Employee')")
    public ResponseEntity<?> getAssignmentDetails(@PathVariable Integer assignmentId){
        Optional<CourseAssignment> assignment = courseService.findAssignmentByAssignmentId(assignmentId);
        if(assignment.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Assignment not found with ID: "+ assignmentId);
        }
        try {
            Course course = courseService.findCourseByAssignment(assignmentId);
            CourseProgress progress = courseService.findCourseProgressByAssignmentId(assignmentId);
            AssignmentResponseDto res = new AssignmentResponseDto();
            res.setAssignment(assignment.get());
            res.setCourse(course);
            res.setProgress(progress);
            return ResponseEntity.status(HttpStatus.OK).body(res);
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
            courseService.updateAssignmentStatus(assignmentId, "ONGOING");
            return ResponseEntity.status(HttpStatus.CREATED).body(progress);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }
}
