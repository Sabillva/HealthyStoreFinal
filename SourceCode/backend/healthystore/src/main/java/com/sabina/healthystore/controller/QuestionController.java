package com.sabina.healthystore.controller;

import com.sabina.healthystore.dto.AnswerQuestionRequest;
import com.sabina.healthystore.dto.CreateQuestionRequest;
import com.sabina.healthystore.dto.QuestionDTO;
import com.sabina.healthystore.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(
            QuestionService questionService) {

        this.questionService = questionService;
    }

    @PostMapping("/api/products/{productId}/questions")
    public QuestionDTO createQuestion(
            @PathVariable Long productId,
            @RequestBody CreateQuestionRequest request) {

        return questionService.createQuestion(
                productId,
                request
        );
    }

    @GetMapping("/api/products/{productId}/questions")
    public List<QuestionDTO> getQuestions(
            @PathVariable Long productId) {

        return questionService
                .getQuestionsByProduct(productId);
    }

    @GetMapping("/api/questions")
    public List<QuestionDTO> getAllQuestions() {

        return questionService
                .getAllQuestions();
    }

    @PutMapping("/api/questions/{questionId}/answer")
    public QuestionDTO answerQuestion(
            @PathVariable Long questionId,
            @RequestBody AnswerQuestionRequest request) {

        return questionService.answerQuestion(
                questionId,
                request
        );
    }
}