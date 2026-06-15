package com.sabina.healthystore.repository;

import com.sabina.healthystore.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    List<Question> findByProductId(Long productId);
}