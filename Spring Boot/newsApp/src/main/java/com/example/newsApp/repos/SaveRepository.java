package com.example.newsApp.repos;

import com.example.newsApp.entities.Save;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaveRepository extends JpaRepository<Save, Long> {

    List<Save> findByUserId(Long userId);

    Save findByNewsIdAndUserId(Long newsId, Long userId);
}
