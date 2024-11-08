package com.example.backend.models;
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

    public Employee(int employeeId) {
        this.employeeId = employeeId;
    }

    @OneToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<CourseAssignment> courseAssignments;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Feedback> feedbacks;
}
