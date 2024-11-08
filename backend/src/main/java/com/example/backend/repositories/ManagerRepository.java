package com.example.backend.repositories;

import com.example.backend.models.Manager;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> {
    Manager findByManagerId(@NotNull(message = "Requested by manager ID is required") Integer managerId);
}
