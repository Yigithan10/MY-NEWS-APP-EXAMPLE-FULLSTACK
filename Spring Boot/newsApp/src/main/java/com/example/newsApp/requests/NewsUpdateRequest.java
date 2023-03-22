package com.example.newsApp.requests;

import lombok.Data;

@Data
public class NewsUpdateRequest {
    Long id;
    Long categoryId;
    String title;
    String text;
}
