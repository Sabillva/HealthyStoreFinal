package com.sabina.healthystore.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuestionDTO {

    private Long id;

    private String userName;

    private String question;

    private String answer;

    private LocalDateTime createdAt;
}