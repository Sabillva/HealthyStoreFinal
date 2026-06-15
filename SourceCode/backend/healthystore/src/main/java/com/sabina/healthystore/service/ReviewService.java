package com.sabina.healthystore.service;

import com.sabina.healthystore.repository.ProductRepository;
import com.sabina.healthystore.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import com.sabina.healthystore.dto.CreateReviewRequest;
import com.sabina.healthystore.dto.ReviewDTO;
import com.sabina.healthystore.entity.Product;
import com.sabina.healthystore.entity.Review;
import java.util.List;
import com.sabina.healthystore.exception.ProductNotFoundException;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewService(
            ReviewRepository reviewRepository,
            ProductRepository productRepository) {

        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public ReviewDTO createReview(
            Long productId,
            CreateReviewRequest request) {

        Product product = productRepository
                .findById(productId)
                .orElseThrow(() ->
                        new ProductNotFoundException(productId));

        Review review = new Review();

        review.setUserName(request.getUserName());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        review.setProduct(product);

        Review saved = reviewRepository.save(review);

        return convertToDTO(saved);
    }

    private ReviewDTO convertToDTO(
            Review review) {

        ReviewDTO dto = new ReviewDTO();

        dto.setId(review.getId());
        dto.setUserName(review.getUserName());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());

        return dto;
    }

    public List<ReviewDTO> getReviewsByProduct(
            Long productId) {

        return reviewRepository
                .findByProductId(productId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
}