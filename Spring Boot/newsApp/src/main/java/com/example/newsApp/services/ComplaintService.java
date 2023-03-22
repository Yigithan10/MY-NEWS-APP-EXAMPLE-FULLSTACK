package com.example.newsApp.services;

import com.example.newsApp.entities.Complaint;
import com.example.newsApp.entities.ComplaintType;
import com.example.newsApp.entities.News;
import com.example.newsApp.entities.User;
import com.example.newsApp.repos.ComplaintRepository;
import com.example.newsApp.repos.ComplaintTypeRepository;
import com.example.newsApp.repos.NewsRepository;
import com.example.newsApp.repos.UserRepository;
import com.example.newsApp.requests.ComplaintCreateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {
    public ComplaintRepository complaintRepository;

    public UserRepository userRepository;

    public NewsRepository newsRepository;

    public ComplaintTypeRepository complaintTypeRepository;

    public ComplaintService(ComplaintRepository complaintRepository, UserRepository userRepository, NewsRepository newsRepository, ComplaintTypeRepository complaintTypeRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.newsRepository = newsRepository;
        this.complaintTypeRepository = complaintTypeRepository;
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public List<Complaint> getAllUserComplaints(Long userId) {
        List<Complaint> complaints = complaintRepository.findByUserId(userId);
        return complaints;
    }

    public ResponseEntity<Complaint> setOneComplaint(ComplaintCreateRequest complaintCreateRequest) {
        Optional<User> user = userRepository.findById(complaintCreateRequest.getUserId());
        Optional<News> news = newsRepository.findById(complaintCreateRequest.getNewsId());
        Optional<ComplaintType> complaintType = complaintTypeRepository.findById(complaintCreateRequest.getComplaintTypeId());

        if(complaintRepository.findByUserIdAndNewsId(user.get().getId(), news.get().getId())==null){
            Complaint complaint = new Complaint();
            complaint.setUser(user.get());
            complaint.setNews(news.get());
            complaint.setComplaintType(complaintType.get());
            complaintRepository.save(complaint);
            return new ResponseEntity<>(complaint, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }
    }

    public void deleteOneComplaint(Long complaintId) {
        complaintRepository.deleteById(complaintId);
    }
}
