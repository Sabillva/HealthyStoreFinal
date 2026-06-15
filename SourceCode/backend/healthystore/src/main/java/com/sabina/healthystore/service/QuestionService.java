package com.sabina.healthystore.service;

import com.sabina.healthystore.dto.AnswerQuestionRequest;
import com.sabina.healthystore.dto.CreateQuestionRequest;
import com.sabina.healthystore.dto.QuestionDTO;
import com.sabina.healthystore.entity.Product;
import com.sabina.healthystore.entity.Question;
import com.sabina.healthystore.exception.ProductNotFoundException;
import com.sabina.healthystore.exception.QuestionNotFoundException;
import com.sabina.healthystore.repository.ProductRepository;
import com.sabina.healthystore.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final ProductRepository productRepository;

    public QuestionService(
            QuestionRepository questionRepository,
            ProductRepository productRepository) {

        this.questionRepository = questionRepository;
        this.productRepository = productRepository;
    }

    public QuestionDTO createQuestion(
            Long productId,
            CreateQuestionRequest request) {

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() ->
                        new ProductNotFoundException(productId));

        Question question = new Question();

        question.setUserName(request.getUserName());
        question.setQuestion(request.getQuestion());
        question.setProduct(product);

        Question saved =
                questionRepository.save(question);

        return convertToDTO(saved);
    }

    public List<QuestionDTO> getQuestionsByProduct(
            Long productId) {

        return questionRepository
                .findByProductId(productId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<QuestionDTO> getAllQuestions() {

        return questionRepository
                .findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public QuestionDTO answerQuestion(
            Long questionId,
            AnswerQuestionRequest request) {

        Question question = questionRepository
                .findById(questionId)
                .orElseThrow(() ->
                        new QuestionNotFoundException(questionId));

        question.setAnswer(
                request.getAnswer()
        );

        Question saved =
                questionRepository.save(question);

        return convertToDTO(saved);
    }

    private QuestionDTO convertToDTO(
            Question question) {

        QuestionDTO dto =
                new QuestionDTO();

        dto.setId(question.getId());
        dto.setUserName(question.getUserName());
        dto.setQuestion(question.getQuestion());
        dto.setAnswer(question.getAnswer());
        dto.setCreatedAt(question.getCreatedAt());

        return dto;
    }
}