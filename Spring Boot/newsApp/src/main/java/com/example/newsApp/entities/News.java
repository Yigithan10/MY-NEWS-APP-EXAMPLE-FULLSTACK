package com.example.newsApp.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name="news")
@Data
public class News {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="news_id", nullable=false, unique=true)
    private Long id;

    @Column(name="news_title", nullable=false)
    private String title;

    @Column(name="news_text", nullable=false)
    private String text;

    @Column(name="news_likes", nullable = false)
    private int likes;

    @Column(name="news_likes_users", nullable = false)
    private String likesUsers;

    @Column(name="news_comments", nullable=false)
    private int comments;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="category_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Category category;

    @Column(name="news_time", nullable = false, unique = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="news_date", nullable = false, unique = false)
    LocalDate localDate = LocalDate.now();
}
