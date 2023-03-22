package com.example.newsApp.repos;

import com.example.newsApp.entities.News;
import com.example.newsApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findByUserId(Long userId);

    List<News> findByCategoryId(Long categoryId);
}
