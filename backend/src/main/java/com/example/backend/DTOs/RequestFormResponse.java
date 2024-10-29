package com.example.backend.DTOs;

import com.example.backend.models.RequestForm;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestFormResponse {
    private String message;
    private RequestForm requestForm;
}
