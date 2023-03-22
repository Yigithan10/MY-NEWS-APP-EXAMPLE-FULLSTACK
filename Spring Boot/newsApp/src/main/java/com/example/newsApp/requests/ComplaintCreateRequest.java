package com.example.newsApp.requests;

import lombok.Data;

@Data
public class ComplaintCreateRequest {
    Long userId;
    Long newsId;
    Long complaintTypeId;
}
