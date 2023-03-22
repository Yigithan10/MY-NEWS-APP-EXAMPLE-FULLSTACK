package com.example.newsApp.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name="complaint_types")
@Data
public class ComplaintType {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="complaint_types_id", nullable=false, unique=true)
    private Long id;

    @Column(name="complaint_types_name", nullable=false, unique=false)
    private String name;
}
