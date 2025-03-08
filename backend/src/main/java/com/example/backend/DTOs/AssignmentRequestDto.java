package com.example.backend.DTOs;

import com.example.backend.models.Employee;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AssignmentRequestDto {
    private List<Integer> employeeIds;
    private Integer managerId;
}
