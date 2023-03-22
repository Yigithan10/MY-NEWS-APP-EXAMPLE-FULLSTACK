package com.example.newsApp.requests;

import lombok.Data;

@Data
public class UserChangePassword {
    Long id;
    String oldPassword;
    String newPassword;
    String newPasswordConfirm;
}
