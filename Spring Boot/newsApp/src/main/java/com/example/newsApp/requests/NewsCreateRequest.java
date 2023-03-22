package com.example.newsApp.requests;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewsCreateRequest {
    String title;
    String text;
    Long userId;
    Long categoryId;
}
