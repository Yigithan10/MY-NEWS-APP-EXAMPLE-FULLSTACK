package com.example.newsApp.requests;

import lombok.Data;

@Data
public class AuthRegisterRequest {
    String username;
    String email;
    String password;
    String language;
}
