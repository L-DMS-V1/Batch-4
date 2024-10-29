package com.example.backend.controllers;

import com.example.backend.DTOs.RequestFormDto;
import com.example.backend.DTOs.RequestFormResponse;
import com.example.backend.models.RequestForm;
import com.example.backend.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.backend.utils.ValidationUtils.isEmptyField;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    @Autowired
    private RequestService requestService;
    @PostMapping("/request/create")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity<?> createRequest(@RequestBody RequestFormDto requestFormDto, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Fields: " + bindingResult.getFieldErrors());
        }
        if (isEmptyField(requestFormDto.getCourseName()) ||
                isEmptyField(requestFormDto.getDescription()) ||
                isEmptyField(requestFormDto.getDuration()) ||
                isEmptyField(requestFormDto.getManagerId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: All required fields must be filled.");
        }
        try{
            RequestForm requestForm = requestService.submitRequest(requestFormDto);
            RequestFormResponse res = new RequestFormResponse("Request created Successfully", requestForm);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing: " + e.getMessage());
        }
    }
}
