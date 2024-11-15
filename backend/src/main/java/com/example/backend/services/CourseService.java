package com.example.backend.services;

import com.example.backend.DTOs.CourseDto;
import com.example.backend.models.Course;
import com.example.backend.models.CourseAssignment;
import com.example.backend.models.CourseProgress;
import com.example.backend.models.Employee;
import com.example.backend.repositories.CourseAssignmentRepository;
import com.example.backend.repositories.CourseProgressRepository;
import com.example.backend.repositories.CourseRepository;
import com.example.backend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Course createCourse(CourseDto courseDto) {
        Course course = new Course();
        course.setCourseName(courseDto.getCourseName());
        course.setDuration(courseDto.getDuration());
        course.setOutcomes(courseDto.getOutcomes());
        course.setKeyConcepts(courseDto.getKeyConcepts());
        course.setResourceLinks(courseDto.getResourceLinks());
        course.setOtherLinks(courseDto.getOtherLinks());
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
        progress.setPercentage(0);
        progress.setStatus("Pending");
        progress.setLastAccessedDate();
        return courseProgressRepository.save(progress);
    }

    public Optional<CourseAssignment> findAssignmentByAssignmentId(Integer assignmentId) {
        return courseAssignmentRepository.findById(assignmentId);
    }
}
