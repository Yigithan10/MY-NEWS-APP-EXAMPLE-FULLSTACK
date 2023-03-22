package com.example.newsApp.repos;

import com.example.newsApp.entities.ComplaintType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintTypeRepository extends JpaRepository<ComplaintType, Long> {
    ComplaintType findByName(String name);
}
