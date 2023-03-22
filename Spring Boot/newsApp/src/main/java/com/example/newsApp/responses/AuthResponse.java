package com.example.newsApp.responses;

import com.example.newsApp.entities.User;
import lombok.Data;

@Data
public class AuthResponse {

    private String token;
    private User user;
}
