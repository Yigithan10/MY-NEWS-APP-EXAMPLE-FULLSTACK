package com.example.newsApp.services;

import com.example.newsApp.entities.Comment;
import com.example.newsApp.entities.News;
import com.example.newsApp.entities.User;
import com.example.newsApp.repos.CommentRepository;
import com.example.newsApp.repos.NewsRepository;
import com.example.newsApp.repos.UserRepository;
import com.example.newsApp.requests.CommentCreateRequest;
import com.example.newsApp.requests.CommentUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    public CommentRepository commentRepository;

    public UserRepository userRepository;

    public NewsRepository newsRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, NewsRepository newsRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.newsRepository = newsRepository;
    }


    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public List<Comment> getOneComment(Long newsId) {
        List<Comment> comments = commentRepository.findByNewsId(newsId);
        return comments;
    }

    public ResponseEntity<Comment> setOneComment(CommentCreateRequest commentCreateRequest) {
        Optional<User> user = userRepository.findById(commentCreateRequest.getUserId());
        Optional<News> news = newsRepository.findById(commentCreateRequest.getNewsId());

        ArrayList<Comment> comments = new ArrayList<>();

        if(user.get()!=null && news.get()!=null){
            Comment comment = new Comment();
            comment.setUser(user.get());
            comment.setNews(news.get());
            comment.setText(commentCreateRequest.getText());
            commentRepository.save(comment);

            comments.addAll(commentRepository.findByNewsId(news.get().getId()));
            news.get().setComments(comments.size());
            newsRepository.save(news.get());
            return new ResponseEntity<>(comment, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }
    }

    public ResponseEntity<Comment> updateOneComment(CommentUpdateRequest commentUpdateRequest) {
        Optional<Comment> comment = commentRepository.findById(commentUpdateRequest.getId());

        if(comment.get()!=null && !comment.get().getText().equals(commentUpdateRequest.getText())){
            Comment updateComment = comment.get();
            updateComment.setText(commentUpdateRequest.getText());
            commentRepository.save(updateComment);
            return new ResponseEntity<>(updateComment, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }
    }

    public void deleteOneComment(Long commentId, Long newsId) {
        commentRepository.deleteById(commentId);
        ArrayList<Comment> comments = new ArrayList<>();
        Optional<News> news = newsRepository.findById(newsId);
        comments.addAll(commentRepository.findByNewsId(news.get().getId()));
        news.get().setComments(comments.size());
        newsRepository.save(news.get());
    }
}
