package com.sabina.healthystore.controller;

import com.sabina.healthystore.dto.CreateReviewRequest;
import com.sabina.healthystore.dto.ReviewDTO;
import com.sabina.healthystore.service.ReviewService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(
            ReviewService reviewService) {

        this.reviewService = reviewService;
    }

    @PostMapping("/{productId}/reviews")
    public ReviewDTO createReview(
            @PathVariable Long productId,
            @RequestBody CreateReviewRequest request) {

        return reviewService.createReview(
                productId,
                request
        );
    }

    @GetMapping("/{productId}/reviews")
    public List<ReviewDTO> getReviewsByProduct(
            @PathVariable Long productId) {

        return reviewService
                .getReviewsByProduct(productId);
    }
}