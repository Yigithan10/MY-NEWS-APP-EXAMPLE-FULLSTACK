package com.example.newsApp.controllers;

import com.example.newsApp.entities.News;
import com.example.newsApp.entities.User;
import com.example.newsApp.requests.NewsCreateRequest;
import com.example.newsApp.requests.NewsUpdateRequest;
import com.example.newsApp.services.NewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsController {
    public NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public List<News> getAllNews(){
        return newsService.getAllNews();
    }

    @GetMapping("userNews/{userId}")
    public List<News> getAllNewsWithUserId(@PathVariable Long userId){
        return newsService.getAllNewsWithUserId(userId);
    }

    @GetMapping("/categories/{categoryId}")
    public List<News> getAllNewsWithCategory(@PathVariable Long categoryId){
        return newsService.getAllNewsWithCategory(categoryId);
    }

    @GetMapping("/{newsId}")
    public News getOneNews(@PathVariable Long newsId){
        return newsService.getOneNews(newsId);
    }

    @PostMapping
    public ResponseEntity<News> setOneNews(@RequestBody NewsCreateRequest newsCreateRequest){
        return newsService.setOneNews(newsCreateRequest);
    }

    @PutMapping
    public ResponseEntity<News> updateOneNews(@RequestBody NewsUpdateRequest newsUpdateRequest){
        return newsService.updateOneNews(newsUpdateRequest);
    }

    @DeleteMapping("/{newsId}")
    public void deleteOneNews(@PathVariable Long newsId){
        newsService.deleteOneNews(newsId);
    }
}
