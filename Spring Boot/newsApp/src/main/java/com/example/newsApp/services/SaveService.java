package com.example.newsApp.services;

import com.example.newsApp.entities.News;
import com.example.newsApp.entities.Save;
import com.example.newsApp.entities.User;
import com.example.newsApp.repos.NewsRepository;
import com.example.newsApp.repos.SaveRepository;
import com.example.newsApp.repos.UserRepository;
import com.example.newsApp.requests.SaveCreateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SaveService {
    public SaveRepository saveRepository;

    public UserRepository userRepository;

    public NewsRepository newsRepository;

    public SaveService(SaveRepository saveRepository, UserRepository userRepository, NewsRepository newsRepository) {
        this.saveRepository = saveRepository;
        this.userRepository = userRepository;
        this.newsRepository = newsRepository;
    }

    public List<Save> getAllSave() {
        return saveRepository.findAll();
    }

    public Optional<Save> getOneSave(Long saveId) {
        return saveRepository.findById(saveId);
    }

    public List<Save> getOneSaveWithUserId(Long userId) {
        return saveRepository.findByUserId(userId);
    }

    public ResponseEntity<Save> setOneSave(SaveCreateRequest saveCreateRequest) {
        Optional<User> user = userRepository.findById(saveCreateRequest.getUserId());
        Optional<News> news = newsRepository.findById(saveCreateRequest.getNewsId());

        if(!news.get().getUser().getId().equals(user.get().getId())){
            if(saveRepository.findByNewsIdAndUserId(saveCreateRequest.getNewsId(), saveCreateRequest.getUserId())==null){
                Save save = new Save();
                save.setUser(user.get());
                save.setNews(news.get());
                saveRepository.save(save);
                return  new ResponseEntity<>(save, HttpStatus.CREATED);
            }else {
                return  new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
            }
        }else {
            return  new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public void deleteOneSave(Long saveId) {
        saveRepository.deleteById(saveId);
    }
}
