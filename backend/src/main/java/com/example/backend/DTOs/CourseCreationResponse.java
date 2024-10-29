package com.example.backend.DTOs;

import com.example.backend.models.Course;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CourseCreationResponse {
    private Course course;
    private String message;
}
