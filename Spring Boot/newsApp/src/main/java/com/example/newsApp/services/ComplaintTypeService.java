package com.example.newsApp.services;

import com.example.newsApp.entities.ComplaintType;
import com.example.newsApp.repos.ComplaintTypeRepository;
import com.example.newsApp.requests.ComplaintTypeCreateRequest;
import com.example.newsApp.requests.ComplaintTypeUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintTypeService {
    public ComplaintTypeRepository complaintTypeRepository;

    public ComplaintTypeService(ComplaintTypeRepository complaintTypeRepository) {
        this.complaintTypeRepository = complaintTypeRepository;
    }

    public List<ComplaintType> getALlComplaintTypes() {
        return complaintTypeRepository.findAll();
    }

    public ComplaintType getOneComplaintType(Long complaintTypeId) {
        Optional<ComplaintType> complaintType = complaintTypeRepository.findById(complaintTypeId);
        return complaintType.orElse(null);
    }

    public ResponseEntity<ComplaintType> setOneComplaintType(ComplaintTypeCreateRequest complaintTypeCreateRequest) {
        ComplaintType complaintType = complaintTypeRepository.findByName(complaintTypeCreateRequest.getName());

        if(complaintType==null){
            ComplaintType newComplaintType = new ComplaintType();
            newComplaintType.setName(complaintTypeCreateRequest.getName());
            complaintTypeRepository.save(newComplaintType);
            return new ResponseEntity<>(newComplaintType, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }
    }

    public ResponseEntity<ComplaintType> updateOneComplaintType(ComplaintTypeUpdateRequest complaintTypeUpdateRequest) {
        Optional<ComplaintType> complaintType = complaintTypeRepository.findById(complaintTypeUpdateRequest.getId());

        if(!complaintType.get().getName().equals(complaintTypeUpdateRequest.getName())){
            ComplaintType updateComplaintType = complaintType.get();
            updateComplaintType.setName(complaintTypeUpdateRequest.getName());
            complaintTypeRepository.save(updateComplaintType);
            return new ResponseEntity<>(updateComplaintType, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);
        }
    }

    public void deleteOneComplaintType(Long complaintTypeId) {
        complaintTypeRepository.deleteById(complaintTypeId);
    }
}
