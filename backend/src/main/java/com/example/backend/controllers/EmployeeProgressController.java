package com.example.backend.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.DTOs.EmployeeProgressDTO;
import com.example.backend.services.EmployeeProgressService;

@RestController
@RequestMapping("/api/employee/progress")
public class EmployeeProgressController {
    @Autowired
    private EmployeeProgressService progressService;

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<EmployeeProgressDTO>> getEmployeeProgress(@PathVariable Long employeeId) {
        return ResponseEntity.ok(progressService.getEmployeeProgress(employeeId));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateEmployeeProgress(@RequestBody EmployeeProgressDTO progressDTO) {
        progressService.updateEmployeeProgress(progressDTO);
        return ResponseEntity.ok("Employee progress updated successfully");
    }
}
