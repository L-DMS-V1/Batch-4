package com.example.backend.controllers;

import com.example.backend.DTOs.AssignmentResponseDto;
import com.example.backend.DTOs.FeedbackDto;
import com.example.backend.models.*;
import com.example.backend.services.CourseService;
import com.example.backend.services.EmployeeService;
import com.example.backend.services.FeedbackService;
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
    @Autowired
    private FeedbackService feedbackService;
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
    @PostMapping("/assignments/{progressId}/complete/{moduleIndex}")
    @PreAuthorize("hasRole('Employee')")
    public ResponseEntity<?> completeAssignment(
            @PathVariable Integer progressId, @PathVariable Integer moduleIndex) {
        try {
            courseService.completeModule(progressId, moduleIndex);
            return ResponseEntity.ok("Course marked as completed successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error completing course module: " + e.getMessage());
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

    @PostMapping("/feedback/{assignmentId}")
    @PreAuthorize("hasRole('Employee')")
    public ResponseEntity<?> submitFeedback(@PathVariable Integer assignmentId, @RequestBody FeedbackDto feedbackDto){
        Optional<CourseAssignment> assignment = courseService.findAssignmentByAssignmentId(assignmentId);
        if(assignment.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Assignment not found with ID: "+ assignmentId);
        }
        Employee employee = courseService.findEmployeeByAssignmentId(assignmentId);
        Course course = courseService.findCourseByAssignment(assignmentId);
        try{
            Feedback feedback = new Feedback();
            feedback.setEmployee(employee);
            feedback.setRating(feedbackDto.getRating());
            feedback.setComment(feedbackDto.getComment());
            feedback.setCourse(course);
            feedbackService.submit(feedback);
            courseService.updateAssignmentStatus(assignmentId, "CLOSED");
            return ResponseEntity.status(HttpStatus.CREATED).body("Feedback Submitted Successfully.");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }
}
