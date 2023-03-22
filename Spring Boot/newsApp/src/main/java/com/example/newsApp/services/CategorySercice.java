package com.example.newsApp.services;

import com.example.newsApp.entities.Category;
import com.example.newsApp.repos.CategoryRepository;
import com.example.newsApp.requests.CategoryCreateRequest;
import com.example.newsApp.requests.CategoryUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategorySercice {

    public CategoryRepository categoryRepository;

    public CategorySercice(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getOneCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        return category;
    }

    public ResponseEntity<String> setOneCategory(CategoryCreateRequest categoryCreateRequest) {
        Category category = categoryRepository.findByName(categoryCreateRequest.getName());
        if(category==null){
            Category newCategory = new Category();
            newCategory.setName(categoryCreateRequest.getName());
            categoryRepository.save(newCategory);
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }else {
            return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> updateOneCategory(CategoryUpdateRequest categoryUpdateRequest) {
        Optional<Category> category = categoryRepository.findById(categoryUpdateRequest.getId());
        if(category!=null){
            Category updateCategory = category.get();
            updateCategory.setName(categoryUpdateRequest.getName());
            categoryRepository.save(updateCategory);
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }else {
            return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
        }
    }

    public void deleteOneCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
