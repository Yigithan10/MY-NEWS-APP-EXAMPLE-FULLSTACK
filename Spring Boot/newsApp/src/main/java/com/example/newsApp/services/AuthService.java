package com.example.newsApp.services;

import com.example.newsApp.entities.Category;
import com.example.newsApp.entities.User;
import com.example.newsApp.exceptions.AuthException;
import com.example.newsApp.jwt.JwtUtil;
import com.example.newsApp.repos.CategoryRepository;
import com.example.newsApp.repos.UserRepository;
import com.example.newsApp.requests.*;
import com.example.newsApp.responses.AuthResponse;
import com.example.newsApp.security.CustomUserDetailsService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    public static UserRepository userRepository;

    public CategoryRepository categoryRepository;

    public PasswordEncoder passwordEncoder;

    private static final String secretKey = "my-app-secret";

    public AuthService(UserRepository userRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public ResponseEntity registerOneUser(AuthRegisterRequest authRegisterRequest) {
        if(userRepository.findByUsername(authRegisterRequest.getUsername().toLowerCase())!=null){
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }else {
            User newUser = new User();
            newUser.setUsername(authRegisterRequest.getUsername().toLowerCase());
            newUser.setEmail(authRegisterRequest.getEmail());
            newUser.setPassword(passwordEncoder.encode(authRegisterRequest.getPassword()));
            newUser.setLanguage(authRegisterRequest.getLanguage());
            newUser.setPhoto("http://192.168.1.42:8080/images/noProfile.png");
            userRepository.save(newUser);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        }
    }

    public ResponseEntity<User> registerOneUserStep1(UserRegisterStep1 userRegisterStep1) {
        Optional<User> user = userRepository.findById(userRegisterStep1.getId());
        Optional<Category> category = categoryRepository.findById(userRegisterStep1.getCategoryId());
        user.get().setCategory(category.get());
        user.get().setAbout(userRegisterStep1.getAbout());
        userRepository.save(user.get());
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    public AuthResponse loginOneUser(AuthRequest authRequest) {
        User foundUser = userRepository.findByUsername(authRequest.getUsername());
        if(foundUser==null){
            throw new AuthException();
        }
        boolean matches =  passwordEncoder.matches(authRequest.getPassword(), foundUser.getPassword());
        if(matches){
            User user = foundUser;
            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            } catch (BadCredentialsException ex) {
                throw new BadCredentialsException("Incorret ", ex);
            }
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            final String token = jwtUtil.generateToken(userDetails);
            AuthResponse authResponse = new AuthResponse();
            authResponse.setUser(user);
            authResponse.setToken(token);
            return authResponse;
        }else {
            throw new AuthException();
        }
    }

    public static ResponseEntity<User> parserToken(String token) {
        JwtParser parser = Jwts.parser().setSigningKey(secretKey);
        try{
            parser.parse(token);
            Claims claims = parser.parseClaimsJws(token).getBody();
            Long userId = Long.valueOf(claims.getSubject());
            Optional<User> user = userRepository.findById(userId);
            return new ResponseEntity(user, HttpStatus.OK);
        } catch (ExpiredJwtException e) {
            System.out.println(" Token expired ");
            User user = new User();
            return new ResponseEntity(user, HttpStatus.BAD_GATEWAY);
        } catch (SignatureException e) {
            System.out.println(" s ");
            User user = new User();
            return new ResponseEntity(user, HttpStatus.BAD_REQUEST);
        } catch(Exception e){
            System.out.println(" e ");
            User user = new User();
            return new ResponseEntity(user, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> getOneUserWithUsername(String username) {
        User user = userRepository.findByUsername(username);
        if(user==null){
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        return new ResponseEntity<>("error", HttpStatus.BAD_GATEWAY);
    }

    public ResponseEntity<String> getOneUserWithEmail(String email) {
        User user = userRepository.findByEmail(email);
        if(user==null){
            return new ResponseEntity<>("success", HttpStatus.OK);
        }
        return new ResponseEntity<>("error", HttpStatus.BAD_GATEWAY);
    }
}
