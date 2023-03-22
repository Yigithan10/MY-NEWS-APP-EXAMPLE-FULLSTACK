package com.example.newsApp.services;

import com.example.newsApp.entities.Comment;
import com.example.newsApp.entities.Like;
import com.example.newsApp.entities.News;
import com.example.newsApp.entities.User;
import com.example.newsApp.repos.LikeRepository;
import com.example.newsApp.repos.NewsRepository;
import com.example.newsApp.repos.UserRepository;
import com.example.newsApp.requests.LikeCreateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LikeService {

    public LikeRepository likeRepository;

    public NewsRepository newsRepository;

    public UserRepository userRepository;

    public LikeService(LikeRepository likeRepository, NewsRepository newsRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
    }

    public List<Like> getAllLikes() {
        return likeRepository.findAll();
    }

    public List<Like> getOneLike(Long newsId) {
        List<Like> news = likeRepository.findByNewsId(newsId);
        return news;
    }

    public ResponseEntity<Like> setOneLikeOrDelete(LikeCreateRequest likeCreateRequest) {
        Optional<User> user = userRepository.findById(likeCreateRequest.getUserId());
        Optional<News> news = newsRepository.findById(likeCreateRequest.getNewsId());
        Like foundLike = likeRepository.findByUserIdAndNewsId(likeCreateRequest.getUserId(), likeCreateRequest.getNewsId());
        String likesUsers = "";

        if(foundLike==null){
            Like like = new Like();
            like.setUser(user.get());
            like.setNews(news.get());
            likeRepository.save(like);

            List<Like> likes = likeRepository.findByNewsId(likeCreateRequest.getNewsId());
            news.get().setLikes(likes.size());

            for (int i = 0; i < likes.size(); i++){
                if(likesUsers.equals("")){
                    likesUsers += likes.get(i).getUser().getId();
                }else {
                    likesUsers += "," + likes.get(i).getUser().getId();
                }
            }

            news.get().setLikesUsers(likesUsers);

            news.get().setLikesUsers(likesUsers);

            newsRepository.save(news.get());
            return new ResponseEntity<>(like, HttpStatus.CREATED);
        }else {
            deleteOneLike(likeCreateRequest.getUserId(), likeCreateRequest.getNewsId());
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    public void deleteOneLike(Long userId, Long newsId) {
        Like newLike = likeRepository.findByUserIdAndNewsId(userId, newsId);
        likeRepository.deleteById(newLike.getId());
        String likesUsers = "";

        Optional<User> user = userRepository.findById(userId);
        Optional<News> news = newsRepository.findById(newsId);
        List<Like> likes = likeRepository.findByNewsId(newsId);
        news.get().setLikes(likes.size());

        for (int i = 0; i < likes.size(); i++){
            if(likesUsers.equals("")){
                likesUsers += likes.get(i).getUser().getId();
            }else {
                likesUsers += "," + likes.get(i).getUser().getId();
            }
        }

        news.get().setLikesUsers(likesUsers);

        newsRepository.save(news.get());
    }
}
