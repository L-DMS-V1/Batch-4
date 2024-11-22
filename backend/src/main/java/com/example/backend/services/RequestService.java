package com.example.backend.services;

import com.example.backend.DTOs.CourseAssignmentDto;
import com.example.backend.DTOs.RequestFormDto;
import com.example.backend.models.*;
import com.example.backend.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequestService {
    @Autowired
    private RequestRepository requestRepository;
    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;


    public RequestForm submitRequest(RequestFormDto requestFormDto){
        Manager manager = managerRepository.findByManagerId(requestFormDto.getManagerId());
        if(manager == null){
            throw new IllegalArgumentException("Manager not found: "+ requestFormDto.getManagerId());
        }
        RequestForm requestForm = new RequestForm();
        requestForm.setCourseName(requestFormDto.getCourseName());
        requestForm.setDescription(requestFormDto.getDescription());
        requestForm.setDuration(requestFormDto.getDuration());
        List<Integer> requiredEmployeeIds = new ArrayList<>();
        for(Integer userId : requestFormDto.getRequiredEmployees()){
            requiredEmployeeIds.add(employeeRepository.findByUserId(userId).getEmployeeId());
        }
        requestForm.setRequiredEmployees(requiredEmployeeIds);
        requestForm.setRequestingManager(managerRepository.findByManagerId(requestFormDto.getManagerId()));
        requestForm.setStatus("PENDING");
        return requestRepository.save(requestForm);
    }

    public List<RequestForm> getAllRequests() {
        List<RequestForm> requestForms = requestRepository.findAll();
        System.out.println(requestForms.toString() + requestForms.get(0).getRequiredEmployees().getClass());
        return requestForms;
    }


    @Transactional
    public void updateRequestStatus(Integer requestId) {
        int rowsUpdated = requestRepository.updateRequestStatus(requestId);
        if (rowsUpdated == 0) {
            throw new IllegalStateException("No PENDING request found for ID: " + requestId);
        }
    }

    public List<RequestForm> getAllRequestsByManagerId(Integer managerId) {
        return requestRepository.findByRequestingManager_ManagerId(managerId);
    }
}
