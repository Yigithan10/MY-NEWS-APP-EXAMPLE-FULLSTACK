package com.example.newsApp.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="comments")
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="comment_id", nullable=false, unique=true)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false, unique = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="news_id", nullable = false, unique = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private News news;

    @Column(name="comment_text", nullable=false, unique=false)
    private String text;

    @Column(name="comment_time", nullable = false, unique = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="comment_date", nullable = false, unique = false)
    LocalDate localDate = LocalDate.now();
}
