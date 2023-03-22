package com.example.newsApp.controllers;

import com.example.newsApp.entities.Category;
import com.example.newsApp.requests.CategoryCreateRequest;
import com.example.newsApp.requests.CategoryUpdateRequest;
import com.example.newsApp.services.CategorySercice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    public CategorySercice categorySercice;

    public CategoryController(CategorySercice categorySercice) {
        this.categorySercice = categorySercice;
    }

    @GetMapping
    public List<Category> getAllCategories(){
        return categorySercice.getAllCategories();
    }

    @GetMapping("/{categoryId}")
    public Category getOneCategory(@PathVariable Long categoryId){
        return categorySercice.getOneCategory(categoryId);
    }

    @PostMapping
    public ResponseEntity<String> setOneCategory(@RequestBody CategoryCreateRequest categoryCreateRequest){
        return categorySercice.setOneCategory(categoryCreateRequest);
    }

    @PutMapping
    public ResponseEntity<String> updateOneCategory(@RequestBody CategoryUpdateRequest categoryUpdateRequest){
        return categorySercice.updateOneCategory(categoryUpdateRequest);
    }

    @DeleteMapping("/{categoryId}")
    public void deleteOneCategory(@PathVariable Long categoryId){
        categorySercice.deleteOneCategory(categoryId);
    }
}
