package com.example.backend.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
public class CourseProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int progressId;

    @Column(nullable = false)
    private LocalDate lastAccessedDate = LocalDate.now();

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "assignmentId", referencedColumnName = "assignmentId", nullable = false)
    @JsonBackReference
    private CourseAssignment courseAssignment;

    @Column(nullable = false, length = 255)
    private String completedModules;

}
