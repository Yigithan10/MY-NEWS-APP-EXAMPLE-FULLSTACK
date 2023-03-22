package com.example.newsApp.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.awt.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name="users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="user_id", nullable=false, unique=true)
    private Long id;

    @Column(name="user_username", nullable=false, unique=false)
    private String username;

    @Column(name="user_email", nullable=false, unique=false)
    private String email;

    @Column(name="user_password", nullable=false, unique=false)
    private String password;

    @Column(name="user_language", nullable=false, unique=false)
    private String language;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="category_id", nullable = true)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Category category;

    @Column(name="user_about", nullable=true, unique=false)
    private String about;

    @Column(name="user_photo", nullable=true, unique=false)
    private String photo;

    @Column(name="user_time", nullable = false, unique = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="user_date", nullable = false, unique = false)
    LocalDate localDate = LocalDate.now();
}
