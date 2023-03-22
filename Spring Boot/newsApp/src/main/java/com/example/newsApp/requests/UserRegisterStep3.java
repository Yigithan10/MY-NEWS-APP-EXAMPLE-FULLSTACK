package com.example.newsApp.requests;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserRegisterStep3 {
    Long id;
    MultipartFile photo;
}
