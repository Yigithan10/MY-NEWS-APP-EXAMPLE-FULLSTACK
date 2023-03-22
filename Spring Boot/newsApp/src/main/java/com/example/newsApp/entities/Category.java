package com.example.newsApp.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="categories")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="category_id", nullable=false, unique=true)
    private Long id;

    @Column(name="category_name", nullable=false, unique=false)
    private String name;
}
