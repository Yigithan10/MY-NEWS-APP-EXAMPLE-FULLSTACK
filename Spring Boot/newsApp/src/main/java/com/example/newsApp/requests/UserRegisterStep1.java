package com.example.newsApp.requests;

import lombok.Data;

@Data
public class UserRegisterStep1 {
    Long id;
    String about;
    Long categoryId;
}
