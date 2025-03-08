package com.example.backend.DTOs;

import com.example.backend.models.Course;
import com.example.backend.models.Employee;
import com.example.backend.models.Manager;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AssignmentRequestResponseDto {
    private Integer requestId;
    private Course course;
    private List<Employee> employees;
    private String status;
    private Manager manager;
}
