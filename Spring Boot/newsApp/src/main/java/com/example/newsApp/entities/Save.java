package com.example.newsApp.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="saves")
@Data
public class Save {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="save_id", nullable=false, unique=true)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="news_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private News news;

    @Column(name="save_time", nullable = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="save_date", nullable = false)
    LocalDate localDate = LocalDate.now();
}
