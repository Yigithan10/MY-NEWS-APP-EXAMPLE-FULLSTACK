package com.example.newsApp.controllers;

import com.example.newsApp.entities.User;
import com.example.newsApp.requests.*;
import com.example.newsApp.responses.AuthResponse;
import com.example.newsApp.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<User> registerOneUser(@RequestBody AuthRegisterRequest authRegisterRequest){
        return authService.registerOneUser(authRegisterRequest);
    }

    @PostMapping("/register/step1")
    public ResponseEntity<User> registerOneUserStep1(@RequestBody UserRegisterStep1 userRegisterStep1){
        return authService.registerOneUserStep1(userRegisterStep1);
    }

    @PostMapping("/login")
    @ResponseBody
    public AuthResponse loginOneUser(@RequestBody AuthRequest authRequest){
        return authService.loginOneUser(authRequest);
    }

    @PostMapping("/parser/{token}")
    public ResponseEntity<User> parserToken(@PathVariable String token){
        return AuthService.parserToken(token);
    }


    @GetMapping("/username/{username}")
    public ResponseEntity<String> getOneUserWithUsername(@PathVariable String username){
        return authService.getOneUserWithUsername(username.toLowerCase());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<String> getOneUserWithEmail(@PathVariable String email){
        return authService.getOneUserWithEmail(email.toLowerCase());
    }
}