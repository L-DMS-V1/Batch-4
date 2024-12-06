package com.example.backend.services;

import com.example.backend.models.Employee;
import com.example.backend.models.Manager;
import com.example.backend.repositories.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {
    @Autowired
    private ManagerRepository managerRepository;

    public Integer findManagerByUserId(int userId) {
        Manager manager = managerRepository.findByUserId(userId);

        if (manager == null) {
            throw new RuntimeException("No manager found for userId: " + userId);
        }
        return manager.getManagerId();
    }

    public Manager getManagerByManagerId(Integer managerId) {
        return managerRepository.findByManagerId(managerId);
    }

    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }
}
