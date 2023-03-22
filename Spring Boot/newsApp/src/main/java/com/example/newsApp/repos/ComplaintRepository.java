package com.example.newsApp.repos;

import com.example.newsApp.entities.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUserId(Long userId);

    Complaint findByUserIdAndNewsId(Long userId, Long newsId);
}
