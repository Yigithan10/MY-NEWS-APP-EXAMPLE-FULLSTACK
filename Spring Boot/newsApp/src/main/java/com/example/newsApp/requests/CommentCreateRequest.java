package com.example.newsApp.requests;

import lombok.Data;

@Data
public class CommentCreateRequest {
    Long id;
    Long userId;
    Long newsId;
    String text;
}
