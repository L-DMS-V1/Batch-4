package com.example.backend.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int managerId;

    @OneToOne
    @JoinColumn(name = "userId", nullable = false)
    @JsonBackReference
    private User user;

}
