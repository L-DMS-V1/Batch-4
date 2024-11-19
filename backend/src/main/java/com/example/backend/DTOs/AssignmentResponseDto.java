package com.example.backend.DTOs;

import com.example.backend.models.Course;
import com.example.backend.models.CourseAssignment;
import com.example.backend.models.CourseProgress;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AssignmentResponseDto {
    private Course course;
    private CourseAssignment assignment;
    private CourseProgress progress;
}
