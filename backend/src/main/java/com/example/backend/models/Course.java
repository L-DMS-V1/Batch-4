package com.example.backend.models;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    @Column(nullable = false)
    private String courseName;

    @Column(nullable = false)
    private String keyConcepts;

    @Column(nullable = false)
    private String duration;

    @Column(nullable = false)
    private String resourceLinks;

    @Column(nullable = false)
    private String otherLinks;

    @Column(nullable = false)
    private String outcomes;
}
