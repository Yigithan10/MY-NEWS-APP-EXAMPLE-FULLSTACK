package com.example.newsApp.controllers;

import com.example.newsApp.entities.Comment;
import com.example.newsApp.requests.CommentCreateRequest;
import com.example.newsApp.requests.CommentUpdateRequest;
import com.example.newsApp.services.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.tokens.CommentToken;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    public CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<Comment> getAllComments(){
        return commentService.getAllComments();
    }

    @GetMapping("/{newsId}")
    public List<Comment> getOneComment(@PathVariable Long newsId){
        return commentService.getOneComment(newsId);
    }

    @PostMapping
    public ResponseEntity<Comment> setOneComment(@RequestBody CommentCreateRequest commentCreateRequest){
        return commentService.setOneComment(commentCreateRequest);
    }

    @PutMapping
    public ResponseEntity<Comment> updateOneComment(@RequestBody CommentUpdateRequest commentUpdateRequest){
        return commentService.updateOneComment(commentUpdateRequest);
    }

    @DeleteMapping("/{commentId}/{newsId}")
    public void deleteOneComment(@PathVariable Long commentId, @PathVariable Long newsId){
        commentService.deleteOneComment(commentId, newsId);
    }
}
