package com.example.backend.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FeedbackDto {
    private Integer rating;
    private String comment;
}
