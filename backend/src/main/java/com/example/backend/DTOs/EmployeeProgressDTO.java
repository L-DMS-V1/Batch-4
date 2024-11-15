package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeProgressDTO {
    private int employeeId;
    private int courseId;
    private double completionPercentage;
    private String status;
}
