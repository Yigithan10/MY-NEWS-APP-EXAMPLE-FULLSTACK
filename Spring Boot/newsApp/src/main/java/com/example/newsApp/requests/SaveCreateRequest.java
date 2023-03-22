package com.example.newsApp.requests;

import lombok.Data;

@Data
public class SaveCreateRequest {
    Long id;
    Long userId;
    Long newsId;
}
