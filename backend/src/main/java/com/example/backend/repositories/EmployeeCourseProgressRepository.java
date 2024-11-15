package com.example.backend.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.EmployeeCourseProgress;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeCourseProgressRepository extends JpaRepository<EmployeeCourseProgress, Long> {
    List<EmployeeCourseProgress> findByEmployeeId(int employeeId);
    List<EmployeeCourseProgress> findByCourseId(int courseId);

    Optional<EmployeeCourseProgress> findByEmployeeIdAndCourseCourseId(int employeeId, int courseId);
}
