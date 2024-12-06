package com.example.backend.controllers;

import com.example.backend.DTOs.*;
import com.example.backend.models.*;
import com.example.backend.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.backend.utils.ValidationUtils.isEmptyField;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private RequestService requestService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;
    @Autowired
    private FeedbackService feedbackService;
    @Autowired
    private ManagerService managerService;
    @Autowired
    private EmployeeService employeeService;

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
    @GetMapping("/assignmentRequests/all")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> findAllAssignmentRequestsMade(){
        try{
            List<AssignmentRequest> requestForms = courseService.getAllAssignmentRequests();
            System.out.println(requestForms.toString());
            List<AssignmentRequestResponseDto> res = new ArrayList<>();
            for(AssignmentRequest request: requestForms){
                AssignmentRequestResponseDto dto = new AssignmentRequestResponseDto();
                dto.setCourse(courseService.findCourseByCourseId(request.getCourseId()));
                dto.setStatus(request.getStatus());
                dto.setManager(managerService.getManagerByManagerId(request.getManagerId()));
                dto.setRequestId(request.getAssignmentRequestId());
                List<Employee> emp = new ArrayList<>();
                for(Integer employeeId : request.getEmployeeIds()){
                    Employee e = employeeService.findEmployee(employeeId).get();
                    emp.add(e);
                }
                dto.setEmployees(emp);
                res.add(dto);
            }
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }

    @PostMapping("/{adminId}/course/create/{requestId}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> createCourse(@PathVariable Integer adminId, @PathVariable Integer requestId, @RequestBody CourseDto courseDto, BindingResult bindingResult){
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
        Admin admin = adminService.getByAdminId(adminId);
        if(admin == null){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Error: No such admin present.");
        }
        try{
            Course course = courseService.createCourse(courseDto, admin);
            CourseCreationResponse res = new CourseCreationResponse(course, "Course created successfully.");
            requestService.updateRequestStatus(requestId);
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }
    @PostMapping("/course/assign")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> assignCourse(@RequestBody CourseAssignmentDto courseAssignmentDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Fields: " + bindingResult.getFieldErrors());
        }
        if(isEmptyField(courseAssignmentDto.getCourseId())||
                isEmptyField(courseAssignmentDto.getDeadline())||
                isEmptyField(courseAssignmentDto.getStatus())||
                isEmptyField(courseAssignmentDto.getEmployeeIds())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All required fields must be filled.");
        }
        try{
            List<CourseAssignment> successfulAssignments = new ArrayList<>();
            List<String> failedAssignments = new ArrayList<>();

            for (Integer employeeId : courseAssignmentDto.getEmployeeIds()) {
                try {
                    CourseAssignment courseAssignment = courseService.assignCourseToEmployee(courseAssignmentDto.getCourseId(), employeeId, courseAssignmentDto.getDeadline(), courseAssignmentDto.getStatus());
                    successfulAssignments.add(courseAssignment);
                } catch (Exception e) {
                    failedAssignments.add("Failed to assign course to employee ID " + employeeId + ": " + e.getMessage());
                }
            }
            Map<String, Object> response = new HashMap<>();
            response.put("successfulAssignments", successfulAssignments);
            response.put("failedAssignments", failedAssignments);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: "+ e.getMessage());
        }
    }

    @PostMapping("/course-assignments/create")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> createNewAssignments(@RequestBody assignmentCreationRequestDto request){
        List<Integer> requestIds = request.getRequestIds();
        HashMap<Integer, Object> res = new HashMap<>();
        for(Integer requestId: requestIds){
            try{
                AssignmentRequest assignment = courseService.findAssignmentRequest(requestId);
                List<CourseAssignment> successfulAssignments = new ArrayList<>();
                List<String> failedAssignments = new ArrayList<>();
                Course course = courseService.findCourseByCourseId(assignment.getCourseId());
                for (Integer employeeId : assignment.getEmployeeIds()) {
                    try {
                        int hours = Integer.parseInt(course.getDuration().split(" ")[0]);
                        CourseAssignment courseAssignment = courseService.assignCourseToEmployee(assignment.getCourseId(), employeeId, LocalDate.now().plusDays(hours / 24).toString(), "ASSIGNED");
                        successfulAssignments.add(courseAssignment);
                    } catch (Exception e) {
                        failedAssignments.add("Failed to assign course to employee ID " + employeeId + ": " + e.getMessage());
                    }
                }
                courseService.updateRequestStatus(requestId);
                Map<String, Object> response = new HashMap<>();
                response.put("successfulAssignments", successfulAssignments);
                response.put("failedAssignments", failedAssignments);
                res.put(requestId, response);

            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: "+ e.getMessage());
            }
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/progress/complete")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> getProgressData() {
        try {
            // Fetch all course progresses
            List<CourseProgress> courseProgresses = courseService.findAllProgresses();

            // Initialize the response list
            List<ProgressDataDto> res = new ArrayList<>();

            // Iterate through each CourseProgress object
            for (CourseProgress courseProgress : courseProgresses) {
                // Ensure null safety for nested properties
                String courseName = courseService.findCourseNameByProgressId(courseProgress.getProgressId());
                String userName = courseProgress.getCourseAssignment() != null &&
                        courseProgress.getCourseAssignment().getEmployee() != null &&
                        courseProgress.getCourseAssignment().getEmployee().getUser() != null
                        ? courseProgress.getCourseAssignment().getEmployee().getUser().getUsername()
                        : "Unknown User";

                // Create a DTO and populate its fields
                ProgressDataDto progressDataDto = new ProgressDataDto();
                String completedModules = courseProgress.getCompletedModules();
                int numberOfCompletedModules = 0;
                int numberOfModules = completedModules.length();
                for(int i = 0; i < numberOfModules; i++){
                    if(completedModules.charAt(i) == '1'){
                        numberOfCompletedModules++;
                    }
                }
                double percentage = (numberOfCompletedModules * 100.0)/numberOfModules;
                progressDataDto.setProgress(percentage);
                progressDataDto.setCourseName(courseName != null ? courseName : "Unknown Course");
                progressDataDto.setEmployeeName(userName);

                // Add the DTO to the response list
                res.add(progressDataDto);

                // Debug log for the DTO
                System.out.println(progressDataDto);
            }

            // Return the response with a 200 status
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            // Log the error and return an appropriate response
            System.err.println("Error while processing: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }

    @GetMapping("/courses/all")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> getAllCourses(){
        List<Course> courses = courseService.findAllCourses();
        return ResponseEntity.status(HttpStatus.OK).body(courses);
    }
    @GetMapping("/feedbacks/{courseId}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> getAllFeedbacks(@PathVariable Integer courseId){
        Course course = courseService.findCourseByCourseId(courseId);
        if(course == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No course for the courseId: "+ courseId);
        }
        try{
            List<Feedback> feedbacks = feedbackService.getAllFeedBacksForACourse(courseId);
            return ResponseEntity.status(HttpStatus.OK).body(feedbacks);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while Processing.");
        }
    }

}
