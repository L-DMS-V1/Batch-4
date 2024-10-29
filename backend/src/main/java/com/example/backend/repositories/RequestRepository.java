package com.example.backend.repositories;

import com.example.backend.models.RequestForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<RequestForm, Integer> {
}
