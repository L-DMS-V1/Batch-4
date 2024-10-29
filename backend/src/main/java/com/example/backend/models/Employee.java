package com.example.backend.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeId;

    @OneToOne
    @JoinColumn(name = "userId", nullable = false)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<CourseAssignment> courseAssignments;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Feedback> feedbacks;
}
