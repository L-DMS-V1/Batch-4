package com.example.backend.services;

import com.example.backend.DTOs.CourseDto;
import com.example.backend.models.*;
import com.example.backend.repositories.CourseAssignmentRepository;
import com.example.backend.repositories.CourseProgressRepository;
import com.example.backend.repositories.CourseRepository;
import com.example.backend.repositories.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;
    @Autowired
    private CourseProgressRepository courseProgressRepository;
    public Course createCourse(CourseDto courseDto, Admin admin) {
        Course course = new Course();
        course.setCourseName(courseDto.getCourseName());
        course.setDuration(courseDto.getDuration());
        course.setOutcomes(courseDto.getOutcomes());
        course.setKeyConcepts(courseDto.getKeyConcepts());
        course.setResourceLinks(courseDto.getResourceLinks());
        course.setOtherLinks(courseDto.getOtherLinks());
        course.setCreatedBy(admin);
        LocalDate currentDate = LocalDate.now();
        course.setCreatedAt(currentDate);
        return courseRepository.save(course);
    }


    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public CourseAssignment assignCourseToEmployee(Integer courseId, Integer employeeId, String deadline, String status) {

        Course course = courseRepository.findByCourseId(courseId);
        if(course == null){
            throw new IllegalArgumentException("Course not found.");
        }

        Employee employee = employeeRepository.findByUserId(employeeId);
        if(employee == null){
            throw new IllegalArgumentException("Employee not found.");
        }

            CourseAssignment assignment = new CourseAssignment();
            assignment.setCourse(course);
            assignment.setEmployee(employee);
            assignment.setStatus(status);
            assignment.setDeadline(deadline);

            return courseAssignmentRepository.save(assignment);
        }


    public List<CourseAssignment> findCourseAssignmentsByEmployee(Optional<Employee> employee) {
        return courseAssignmentRepository.findByEmployee(employee);
    }
    public CourseProgress initiateProgressRecord(CourseAssignment assignment){
        CourseProgress progress = new CourseProgress();
        progress.setCourseAssignment(assignment);
        progress.setCompletedModules("0".repeat(assignment.getCourse().getResourceLinks().split(",").length));
        progress.setStatus("PENDING");
        progress.setLastAccessedDate(LocalDate.now());
        return courseProgressRepository.save(progress);
    }

    public Optional<CourseAssignment> findAssignmentByAssignmentId(Integer assignmentId) {
        return courseAssignmentRepository.findById(assignmentId);
    }


    public Course findCourseByAssignment(Integer assignmentId) {
        return courseAssignmentRepository.findCourseByAssignmentId(assignmentId);
    }

    public CourseProgress findCourseProgressByAssignmentId(Integer assignmentId) {
        return courseProgressRepository.findByCourseAssignment_AssignmentId(assignmentId);
    }

    @Transactional
    public void updateAssignmentStatus(Integer assignmentId, String status) {
        int rowsAffected = courseAssignmentRepository.updateCourseAssignmentStatus(assignmentId, status);
        if (rowsAffected == 0) {
            throw new RuntimeException("No rows affected. Assignment ID might be invalid.");
        }
    }

    public List<CourseProgress> findAllProgresses() {
        return courseProgressRepository.findAll();
    }

    public String findCourseNameByProgressId(int progressId) {
        return courseProgressRepository.findCourseNameByProgressId(progressId);
    }

    @Transactional
    public void completeModule(Integer progressId, Integer moduleIndex) {
        // Fetch the current bit string (completedModules) from the database.
        String completedModules = courseProgressRepository.findById(progressId)
                .orElseThrow(() -> new RuntimeException("Progress record not found for ID: " + progressId))
                .getCompletedModules();

        // Validate the moduleIndex is within the bounds of the string.
        if (moduleIndex < 0 || moduleIndex >= completedModules.length()) {
            throw new IllegalArgumentException("Invalid moduleIndex: " + moduleIndex);
        }

        // Create the updated bit string, marking the specific module as completed ('1').
        String updatedBitString = completedModules.substring(0, moduleIndex) + '1' + completedModules.substring(moduleIndex + 1);

        // Update the progress record in the database.
        int rowsAffected = courseProgressRepository.updateProgress(progressId, updatedBitString);

        // If no rows were affected, it means the update didn't happen; throw an error.
        if (rowsAffected == 0) {
            throw new RuntimeException("Failed to update progress. No matching record found.");
        }
        if(updatedBitString.indexOf('0') == -1){
            courseProgressRepository.updateStatus(progressId, "COMPLETED");
            CourseAssignment assignment = courseProgressRepository.findCourseAssignment_AssignmentIdByProgressId(progressId);
            courseAssignmentRepository.updateCourseAssignmentStatus(assignment.getAssignmentId(), "COMPLETED");
        }
    }

    public Employee findEmployeeByAssignmentId(Integer assignmentId) {
        return courseAssignmentRepository.findEmployeeByAssignmentId(assignmentId);
    }
}
