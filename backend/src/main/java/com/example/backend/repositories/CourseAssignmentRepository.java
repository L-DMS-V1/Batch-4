package com.example.backend.repositories;

import com.example.backend.models.Course;
import com.example.backend.models.CourseAssignment;
import com.example.backend.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, Integer> {
    List<CourseAssignment> findByEmployee(Optional<Employee> employee);

    @Query("SELECT ca.course FROM CourseAssignment ca WHERE ca.assignmentId = :assignmentId")
    Course findCourseByAssignmentId(@Param("assignmentId") Integer assignmentId);

    @Modifying
    @Query("UPDATE CourseAssignment r SET r.status = :status WHERE r.id = :assignmentId")
    int updateCourseAssignmentStatus(@Param("assignmentId") Integer assignmentId,@Param("status") String status);

}
