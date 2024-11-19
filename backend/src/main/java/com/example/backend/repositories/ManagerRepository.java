package com.example.backend.repositories;

import com.example.backend.models.Employee;
import com.example.backend.models.Manager;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> {
    Manager findByManagerId(@NotNull(message = "Requested by manager ID is required") Integer managerId);

    @Query("SELECT m FROM Manager m WHERE m.user.userId = :userId")
    Manager findByUserId(@Param("userId") int userId);
}
