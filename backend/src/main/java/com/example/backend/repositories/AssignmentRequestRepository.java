package com.example.backend.repositories;

import com.example.backend.models.AssignmentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AssignmentRequestRepository extends JpaRepository<AssignmentRequest, Integer> {
    @Modifying
    @Query("UPDATE AssignmentRequest r SET r.status = :status WHERE r.assignmentRequestId = :requestId")
    int updateAssignmentRequestStatus(@Param("requestId") Integer requestId, @Param("status") String completed);
}
