package com.example.newsApp.controllers;

import com.example.newsApp.entities.Complaint;
import com.example.newsApp.requests.ComplaintCreateRequest;
import com.example.newsApp.services.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {
    public ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @GetMapping
    public List<Complaint> getAllComplaints(){
        return complaintService.getAllComplaints();
    }

    @GetMapping("/{userId}")
    public List<Complaint> getAllUserComplaints(@PathVariable Long userId){
        return complaintService.getAllUserComplaints(userId);
    }

    @PostMapping
    public ResponseEntity<Complaint> setOneComplaint(@RequestBody ComplaintCreateRequest complaintCreateRequest){
        return complaintService.setOneComplaint(complaintCreateRequest);
    }

    @DeleteMapping("/{complaintId}")
    public void deleteOneComplaint(@PathVariable Long complaintId){
        complaintService.deleteOneComplaint(complaintId);
    }
}
