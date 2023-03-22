package com.example.newsApp.controllers;

import com.example.newsApp.entities.Like;
import com.example.newsApp.entities.News;
import com.example.newsApp.requests.LikeCreateRequest;
import com.example.newsApp.services.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/likes")
public class LikeController {
    public LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping
    public List<Like> getAllLikes(){
        return likeService.getAllLikes();
    }

    @GetMapping("/{newsId}")
    public List<Like> getOneLike(@PathVariable Long newsId){
        return likeService.getOneLike(newsId);
    }

    @PostMapping
    public ResponseEntity<Like> setOneLikeOrDelete(@RequestBody LikeCreateRequest likeCreateRequest){
        return likeService.setOneLikeOrDelete(likeCreateRequest);
    }

    @DeleteMapping("/{userId}/{newsId}")
    public void deleteOneLike(@PathVariable Long userId, Long newsId){
        likeService.deleteOneLike(userId, newsId);
    }
}
