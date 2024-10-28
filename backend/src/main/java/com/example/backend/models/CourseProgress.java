package com.example.backend.models;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class CourseProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int progressId;

    @Column(nullable = false)
    private String lastAccessedDate;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "assignmentId", nullable = false)
    private CourseAssignment courseAssignment;

    private int percentage;
}
