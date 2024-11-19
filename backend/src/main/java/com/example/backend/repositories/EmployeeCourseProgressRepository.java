package com.example.backend.repositories;

import com.example.backend.DTOs.EmployeeProgressDTO;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.EmployeeCourseProgress;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeCourseProgressRepository extends JpaRepository<EmployeeCourseProgress, Integer> {
    List<EmployeeCourseProgress> findByEmployee_EmployeeId(Integer employeeId);
    List<EmployeeCourseProgress> findByCourse_CourseId(Integer courseId);

    Optional<EmployeeCourseProgress> findByEmployee_EmployeeIdAndCourse_CourseId(Integer employeeId, Integer courseId);

//    List<EmployeeProgressDTO> getEmployeeProgressByEmployeeId(Integer employeeId);
}
