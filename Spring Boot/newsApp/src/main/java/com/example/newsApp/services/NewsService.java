package com.example.newsApp.services;

import com.example.newsApp.entities.Category;
import com.example.newsApp.entities.Like;
import com.example.newsApp.entities.News;
import com.example.newsApp.entities.User;
import com.example.newsApp.repos.CategoryRepository;
import com.example.newsApp.repos.NewsRepository;
import com.example.newsApp.repos.UserRepository;
import com.example.newsApp.requests.NewsCreateRequest;
import com.example.newsApp.requests.NewsUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Service
public class NewsService {

    public NewsRepository newsRepository;

    public UserRepository userRepository;
    public CategoryRepository categoryRepository;

    public NewsService(NewsRepository newsRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public List<News> getAllNewsWithUserId(Long userId) {
        return newsRepository.findByUserId(userId);
    }

    public List<News> getAllNewsWithCategory(Long categoryId) {
        return newsRepository.findByCategoryId(categoryId);
    }

    public News getOneNews(Long newsId) {
        News news = newsRepository.findById(newsId).orElse(null);
        if(news!=null){
            return news;
        }

        return null;
    }

    public ResponseEntity<News> setOneNews(NewsCreateRequest newsCreateRequest) {
        Optional<User> user = userRepository.findById(newsCreateRequest.getUserId());
        Optional<Category> category = categoryRepository.findById(newsCreateRequest.getCategoryId());
        News news = new News();

        news.setTitle(newsCreateRequest.getTitle());
        news.setText(newsCreateRequest.getText());
        news.setUser(user.get());
        news.setCategory(category.get());
        news.setComments(0);
        news.setLikes(0);
        news.setLikesUsers("");

        newsRepository.save(news);
        return new ResponseEntity<>(news, HttpStatus.CREATED);
    }

    public ResponseEntity<News> updateOneNews(NewsUpdateRequest newsUpdateRequest) {
        Optional<News> news = newsRepository.findById(newsUpdateRequest.getId());
        Optional<Category> category = categoryRepository.findById(newsUpdateRequest.getCategoryId());

        if(news!=null){
            News updateNews = news.get();
            if(!updateNews.getTitle().equals(newsUpdateRequest.getTitle()) || !updateNews.getText().equals(newsUpdateRequest.getText()) || !updateNews.getCategory().getId().equals(newsUpdateRequest.getCategoryId())){
                updateNews.setCategory(category.get());
                updateNews.setTitle(newsUpdateRequest.getTitle());
                updateNews.setText(newsUpdateRequest.getText());
                newsRepository.save(updateNews);
                return new ResponseEntity<>(updateNews, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }
    }

    public void deleteOneNews(Long newsId) {
         newsRepository.deleteById(newsId);
    }
}
