package com.example.newsApp.controllers;

import com.example.newsApp.entities.Save;
import com.example.newsApp.requests.SaveCreateRequest;
import com.example.newsApp.services.SaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/saves")
public class SaveController {
    public SaveService saveService;

    public SaveController(SaveService saveService) {
        this.saveService = saveService;
    }

    @GetMapping
    public List<Save> getAllSave(){
        return saveService.getAllSave();
    }

    @GetMapping("/{saveId}")
    public Optional<Save> getOneSave(@PathVariable Long saveId){
        return saveService.getOneSave(saveId);
    }

    @GetMapping("/user/{userId}")
    public List<Save> getOneSaveWithUserId(@PathVariable Long userId){
        return saveService.getOneSaveWithUserId(userId);
    }

    @PostMapping
    public ResponseEntity<Save> setOneSave(@RequestBody SaveCreateRequest saveCreateRequest){
        return saveService.setOneSave(saveCreateRequest);
    }

    @DeleteMapping("/{saveId}")
    public void deleteOneSave(@PathVariable Long saveId){
        saveService.deleteOneSave(saveId);
    }
}
