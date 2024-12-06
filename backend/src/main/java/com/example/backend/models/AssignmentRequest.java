package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AssignmentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int assignmentRequestId;
    @Column(nullable = false)
    private Integer courseId;
    @Column(nullable = false)
    private List<Integer> employeeIds;
    @Column(nullable = false)
    private String status;
    @Column(nullable = false)
    private Integer managerId;

}
