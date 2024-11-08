package com.example.backend.services;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import com.example.backend.DTOs.EmployeeProgressDTO;
import com.example.backend.models.Course;
import com.example.backend.models.Employee;
import com.example.backend.models.EmployeeCourseProgress;
import com.example.backend.repositories.EmployeeCourseProgressRepository;
import java.util.stream.Collectors;

@Service
public class EmployeeProgressService {
    @Autowired
    private EmployeeCourseProgressRepository progressRepository;

    public List<EmployeeProgressDTO> getEmployeeProgress(int employeeId) {
        List<EmployeeCourseProgress> progressList = progressRepository.findByEmployeeId(employeeId);
        return progressList.stream()
                .map(progress -> new EmployeeProgressDTO(
                        progress.getEmployee().getEmployeeId(),
                        progress.getCourse().getCourseId(),
                        progress.getCompletionPercentage(),
                        progress.getStatus()))
                .collect(Collectors.toList());
    }

    public List<EmployeeProgressDTO> getEmployeeProgress(Long employeeId) {
        return getEmployeeProgress(employeeId.intValue());
    }

    public void updateEmployeeProgress(EmployeeProgressDTO progressDTO) {
         Optional<EmployeeCourseProgress> progressOpt = progressRepository.findByEmployeeIdAndCourseCourseId(
            progressDTO.getEmployeeId(), progressDTO.getCourseId());

            EmployeeCourseProgress progress = progressOpt.orElse(new EmployeeCourseProgress());
        
            if (progress.getEmployee() == null) {
                progress.setEmployee(new Employee(progressDTO.getEmployeeId()));
            }
            if (progress.getCourse() == null) {
                progress.setCourse(new Course(progressDTO.getCourseId()));
            }

        progress.setCompletionPercentage(progressDTO.getCompletionPercentage());
        progress.setStatus(progressDTO.getStatus());
        progress.setLastUpdated(LocalDateTime.now());

        progressRepository.save(progress);
    }
}
