package com.example.backend.services;

import com.example.backend.models.Feedback;
import com.example.backend.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public void submit(Feedback feedback) {
        feedbackRepository.save(feedback);
    }
}
