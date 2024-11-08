package com.example.backend.repositories;

import com.example.backend.models.CourseAssignment;
import com.example.backend.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, Integer> {
    List<CourseAssignment> findByEmployee(Optional<Employee> employee);
}
