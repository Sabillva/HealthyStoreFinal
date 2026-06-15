package com.sabina.healthystore.dto;

import lombok.Data;

@Data
public class CreateReviewRequest {

    private String userName;

    private Integer rating;

    private String comment;
}