package com.example.backend.services;

import com.example.backend.DTOs.CourseDto;
import com.example.backend.models.Course;
import com.example.backend.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
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
}
