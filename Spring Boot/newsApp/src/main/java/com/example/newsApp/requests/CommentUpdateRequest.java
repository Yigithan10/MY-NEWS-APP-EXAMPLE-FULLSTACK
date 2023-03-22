package com.example.newsApp.requests;

import lombok.Data;

@Data
public class CommentUpdateRequest {
    Long id;
    String text;
}