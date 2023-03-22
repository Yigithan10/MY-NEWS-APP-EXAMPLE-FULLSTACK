package com.example.newsApp.controllers;

import com.example.newsApp.entities.ComplaintType;
import com.example.newsApp.requests.ComplaintTypeCreateRequest;
import com.example.newsApp.requests.ComplaintTypeUpdateRequest;
import com.example.newsApp.services.ComplaintTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaintTypes")
public class ComplaintTypeController {
    public ComplaintTypeService complaintTypeService;

    public ComplaintTypeController(ComplaintTypeService complaintTypeService) {
        this.complaintTypeService = complaintTypeService;
    }

    @GetMapping
    public List<ComplaintType> getAllComplaintTypes(){
        return complaintTypeService.getALlComplaintTypes();
    }

    @GetMapping("/{complaintTypeId}")
    public ComplaintType getOneComplaintType(@PathVariable Long complaintTypeId){
        return complaintTypeService.getOneComplaintType(complaintTypeId);
    }

    @PostMapping
    public ResponseEntity<ComplaintType> setOneComplaintType(@RequestBody ComplaintTypeCreateRequest complaintTypeCreateRequest){
        return complaintTypeService.setOneComplaintType(complaintTypeCreateRequest);
    }

    @PutMapping
    public ResponseEntity<ComplaintType> updateOneComplaintType(@RequestBody ComplaintTypeUpdateRequest complaintTypeUpdateRequest){
        return complaintTypeService.updateOneComplaintType(complaintTypeUpdateRequest);
    }

    @DeleteMapping("/{complaintTypeId}")
    public void deleteOneComplaintType(@PathVariable Long complaintTypeId){
        complaintTypeService.deleteOneComplaintType(complaintTypeId);
    }
}
