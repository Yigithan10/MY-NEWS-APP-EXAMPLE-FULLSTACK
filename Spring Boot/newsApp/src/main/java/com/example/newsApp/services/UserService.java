package com.example.newsApp.services;

import com.example.newsApp.entities.Category;
import com.example.newsApp.entities.User;
import com.example.newsApp.repos.CategoryRepository;
import com.example.newsApp.repos.UserRepository;
import com.example.newsApp.requests.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    public UserRepository userRepository;

    public CategoryRepository categoryRepository;

    public PasswordEncoder passwordEncoder;


    public UserService(UserRepository userRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getOneUser(Long userId) {
        return userRepository.findById(userId).orElse( null);
    }

    public List<User> getContainsAllUsers(String username) {
        return userRepository.findByUsernameContains(username);
    }

    public ResponseEntity<String> changeUsername(UserChangeUsername userChangeUsername) {
        Optional<User> user = userRepository.findById(userChangeUsername.getId());
        User foundUser = user.get();
        if(userRepository.findByUsername(userChangeUsername.getUsername().toLowerCase())==null){
            foundUser.setUsername(userChangeUsername.getUsername().toLowerCase());
            userRepository.save(foundUser);
            return new ResponseEntity<>("success", HttpStatus.OK);
        }else if (userChangeUsername.getUsername().toLowerCase().equals(user.get().getUsername())){
            return new ResponseEntity<>("error", HttpStatus.BAD_GATEWAY);
        }else {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> changeEmail(UserChangeEmail userChangeEmail) {
        Optional<User> user = userRepository.findById(userChangeEmail.getId());
        User foundUser = user.get();
        if(userRepository.findByEmail(userChangeEmail.getEmail())==null){
            foundUser.setEmail(userChangeEmail.getEmail());
            userRepository.save(foundUser);
            return new ResponseEntity<>("success", HttpStatus.OK);
        }else if (userChangeEmail.getEmail().equals(user.get().getEmail())){
            return new ResponseEntity<>("error", HttpStatus.BAD_GATEWAY);
        }else {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> changePassword(UserChangePassword userChangePassword) {
        Optional<User> user = userRepository.findById(userChangePassword.getId());
        boolean matches =  passwordEncoder.matches(userChangePassword.getOldPassword(), user.get().getPassword());
        if(matches){
            user.get().setPassword(passwordEncoder.encode(userChangePassword.getNewPassword()));
            userRepository.save(user.get());
            return new ResponseEntity<>("success", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> changeLanguage(UserChangeLanguage userChangeLanguage) {
        Optional<User> user = userRepository.findById(userChangeLanguage.getId());
        if(!user.get().getLanguage().equals(userChangeLanguage.getLanguage())){
            user.get().setLanguage(userChangeLanguage.getLanguage());
            userRepository.save(user.get());
            return new ResponseEntity<>("success", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> changeCategory(UserChangeCategory userChangeCategory) {
        Optional<User> user = userRepository.findById(userChangeCategory.getId());
        Optional<Category> category = categoryRepository.findById(userChangeCategory.getCategoryId());
        if(!user.get().getCategory().getId().equals(userChangeCategory.getCategoryId())){
            user.get().setCategory(category.get());
            userRepository.save(user.get());
            return new ResponseEntity<>("success", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> changeAbout(UserChangeAbout userChangeAbout) {
        Optional<User> user = userRepository.findById(userChangeAbout.getId());
        if(user.get().getAbout()==null || !user.get().getAbout().equals(userChangeAbout.getAbout())){
            user.get().setAbout(userChangeAbout.getAbout());
            userRepository.save(user.get());
            return new ResponseEntity<>("success", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<User> changePhoto(Long userId, MultipartFile file) {
        Optional<User> user = userRepository.findById(userId);
        String fileName = file.getOriginalFilename();

        try{
            file.transferTo( new File("D:\\Projelerim\\Java Intellij\\newsApp\\src\\main\\resources\\static\\images\\" + fileName));
            user.get().setPhoto("http://192.168.1.42:8080/images/" + fileName);
            userRepository.save(user.get());
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(user.get(), HttpStatus.BAD_GATEWAY);
        }
    }

    public ResponseEntity<User> noPhoto(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if(!user.get().getPhoto().equals("http://192.168.1.42:8080/images/noProfile.png")){
            user.get().setPhoto("http://192.168.1.42:8080/images/noProfile.png");
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(user.get(), HttpStatus.BAD_GATEWAY);
        }
    }
}