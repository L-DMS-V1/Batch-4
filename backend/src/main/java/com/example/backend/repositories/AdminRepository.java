package com.example.backend.repositories;

import com.example.backend.models.Admin;
import com.example.backend.models.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    @Query("SELECT a FROM Admin a WHERE a.user.userId = :userId")
    Admin findByUserId(@Param("userId") int userId);

    Admin findByAdminId(Integer adminId);
}
