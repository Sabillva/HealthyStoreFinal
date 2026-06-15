package com.sabina.healthystore.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewDTO {

    private Long id;

    private String userName;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;
}