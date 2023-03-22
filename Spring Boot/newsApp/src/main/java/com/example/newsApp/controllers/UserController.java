package com.example.newsApp.controllers;

import com.example.newsApp.entities.User;
import com.example.newsApp.requests.*;
import com.example.newsApp.services.UserService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    public UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getOneUser(@PathVariable Long userId){
        return userService.getOneUser(userId);
    }

    @PutMapping("/changeUsername")
    public ResponseEntity<String> changeUsername(@RequestBody UserChangeUsername userChangeUsername){
        return userService.changeUsername(userChangeUsername);
    }

    @PutMapping("/changeEmail")
    public ResponseEntity<String> changeEmail(@RequestBody UserChangeEmail userChangeEmail){
        return userService.changeEmail(userChangeEmail);
    }

    @PutMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody UserChangePassword userChangePassword){
        return userService.changePassword(userChangePassword);
    }

    @PutMapping("/changeLanguage")
    public ResponseEntity<String> changeLanguage(@RequestBody UserChangeLanguage userChangeLanguage){
        return userService.changeLanguage(userChangeLanguage);
    }

    @PutMapping("/changeCategory")
    public ResponseEntity<String> changeCategory(@RequestBody UserChangeCategory userChangeCategory){
        return userService.changeCategory(userChangeCategory);
    }

    @PutMapping("/changeAbout")
    public ResponseEntity<String> changeAbout(@RequestBody UserChangeAbout userChangeAbout){
        return userService.changeAbout(userChangeAbout);
    }

    @PostMapping("/changePhoto/{userId}")
    public ResponseEntity<User> changePhoto(@PathVariable Long userId, @RequestParam("file") MultipartFile file){
        return userService.changePhoto(userId, file);
    }

    @PostMapping("/noPhoto/{userId}")
    public ResponseEntity<User> noPhoto(@PathVariable Long userId){
        return userService.noPhoto(userId);
    }

    @GetMapping("/contains/{username}")
    public List<User> getContainsAllUsers(@PathVariable String username){
        return userService.getContainsAllUsers(username);
    }
}
