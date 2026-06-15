package com.sabina.healthystore.controller;

import com.google.firebase.auth.FirebaseToken;
import com.sabina.healthystore.dto.AnswerQuestionRequest;
import com.sabina.healthystore.dto.QuestionDTO;
import com.sabina.healthystore.security.SecurityUtils;
import com.sabina.healthystore.service.QuestionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {

    private final QuestionService questionService;

    public AdminController(
            QuestionService questionService) {

        this.questionService =
                questionService;
    }

    @GetMapping("/api/admin/test")
    public String adminTest(
            HttpServletRequest request) {

        FirebaseToken token =
                (FirebaseToken)
                        request.getAttribute(
                                "firebaseUser"
                        );

        if (token == null) {

            return "No token";
        }

        System.out.println(
                token.getClaims()
        );

        if (!SecurityUtils.isAdmin(token)) {

            return "Access denied";
        }

        return "Admin access granted";
    }

    @PutMapping(
            "/api/admin/questions/{id}/answer"
    )
    public QuestionDTO answerQuestion(
            @PathVariable Long id,
            @RequestBody
            AnswerQuestionRequest request) {

        return questionService
                .answerQuestion(
                        id,
                        request
                );
    }
}