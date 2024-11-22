package com.example.backend.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
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

    @ManyToOne
    @JoinColumn(name = "adminId", referencedColumnName = "adminId")
    @JsonBackReference
    private Admin createdBy;

    @Column(nullable = false)
    private LocalDate createdAt;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Feedback> feedbacks;

//    public Course(int courseId) {
//        this.courseId = courseId;
//    }
}
