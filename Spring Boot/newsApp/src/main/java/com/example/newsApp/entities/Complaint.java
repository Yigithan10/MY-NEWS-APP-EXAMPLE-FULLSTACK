package com.example.newsApp.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="complaints")
@Data
public class Complaint {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="complaint_id", nullable=false, unique=true)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id", nullable = false, unique = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="news_id", nullable = false, unique = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private News news;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="complaint_type_id", nullable = false, unique = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private ComplaintType complaintType;

    @Column(name="complaint_time", nullable = false, unique = false)
    LocalTime localTime = LocalTime.now();

    @Column(name="complaint_date", nullable = false, unique = false)
    LocalDate localDate = LocalDate.now();
}
