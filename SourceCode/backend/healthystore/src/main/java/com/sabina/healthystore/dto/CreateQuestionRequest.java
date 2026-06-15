package com.sabina.healthystore.dto;

import lombok.Data;

@Data
public class CreateQuestionRequest {

    private String userName;

    private String question;
}