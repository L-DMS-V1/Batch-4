package com.example.backend.repositories;

import com.example.backend.models.CourseAssignment;
import com.example.backend.models.CourseProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseProgressRepository extends JpaRepository<CourseProgress, Integer> {
    CourseProgress findByCourseAssignment_AssignmentId(Integer assignmentId);

    @Query("SELECT c.courseName FROM CourseProgress cp JOIN cp.courseAssignment ca JOIN ca.course c WHERE cp.progressId = :progressId")
    String findCourseNameByProgressId(@Param("progressId") int progressId);

    @Modifying
    @Query("UPDATE CourseProgress cp SET cp.completedModules = :updatedBitString WHERE cp.progressId = :progressId")
    int updateProgress(@Param("progressId") Integer progressId, @Param("updatedBitString") String updatedBitString);

    @Modifying
    @Query("UPDATE CourseProgress cp SET cp.status = :status WHERE cp.progressId = :progressId")
    void updateStatus(@Param("progressId") Integer progressId, @Param("status") String status);

    @Query("SELECT cp.courseAssignment FROM CourseProgress cp WHERE cp.progressId = :progressId")
    CourseAssignment findCourseAssignment_AssignmentIdByProgressId(@Param("progressId") Integer progressId);

}
