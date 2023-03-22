package com.example.newsApp.repos;

import com.example.newsApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String Email);

    List<User> findByUsernameContains(String username);
}
