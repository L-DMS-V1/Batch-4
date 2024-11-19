package com.example.backend.services;

import com.example.backend.models.Admin;
import com.example.backend.models.Manager;
import com.example.backend.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    public Integer findAdminByUserId(int userId) {
        Admin admin = adminRepository.findByUserId(userId);

        if (admin == null) {
            throw new RuntimeException("No manager found for userId: " + userId);
        }
        return admin.getAdminId();
    }

    public Admin getByAdminId(Integer adminId) {
        return adminRepository.findByAdminId(adminId);
    }
}
