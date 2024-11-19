package com.example.backend.repositories;

import com.example.backend.models.RequestForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<RequestForm, Integer> {
    @Modifying
    @Query("UPDATE RequestForm r SET r.status = 'COMPLETED' WHERE r.id = :requestId")
    int updateRequestStatus(@Param("requestId") Integer requestId);

    List<RequestForm> findByRequestingManager_ManagerId(Integer managerId);

}
