package com.example.newsApp.repos;

import com.example.newsApp.entities.Like;
import com.example.newsApp.entities.News;
import com.example.newsApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {

    List<Like> findByNewsId(Long newsId);
    List<User> findByUserId(Long userId);

    Like findByUserIdAndNewsId(Long userId, Long newsId);
}
