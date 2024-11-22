package com.example.backend.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProgressDataDto {
    private String courseName;
    private String employeeName;
    private double progress;
}
