package com.example.backend.DTOs;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;


@Data
public class RequestFormDto {
    @NotNull(message = "Course name is required")
    @Size(min = 2, max = 100, message = "Course name should be between 2 and 100 characters")
    private String courseName;
    @NotNull(message = "Description is required")
    @Size(min = 5, max = 500, message = "Description should be between 5 and 500 characters")
    private String description;
    @NotNull(message = "Duration is required")
    private String duration;
    private List<Integer> requiredEmployees;
    @NotNull(message = "Requested by manager ID is required")
    private Integer managerId;
}
