package com.example.newsApp.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="likes")
@Data
public class Like {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="like_id", nullable=false, unique=true)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false, unique = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="news_id", nullable = false, unique = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private News news;

    @Column(name="like_time", nullable = false, unique = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="like_date", nullable = false, unique = false)
    LocalDate localDate = LocalDate.now();
}
