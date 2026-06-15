package com.sabina.healthystore.service;

import com.sabina.healthystore.dto.ProductDTO;
import com.sabina.healthystore.entity.Product;
import com.sabina.healthystore.exception.ProductNotFoundException;
import com.sabina.healthystore.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.sabina.healthystore.dto.CreateProductRequest;
import com.sabina.healthystore.dto.UpdateProductRequest;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDTO> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    private ProductDTO convertToDTO(Product product) {

        ProductDTO dto = new ProductDTO();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setImageUrl(product.getImageUrl());
        dto.setCategory(
                product.getCategory()
        );

        return dto;
    }

    public ProductDTO getProductById(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(id));

        return convertToDTO(product);
    }

    public ProductDTO createProduct(
            CreateProductRequest request) {

        Product product = new Product();

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(
                request.getCategory()
        );

        Product saved =
                productRepository.save(product);

        return convertToDTO(saved);
    }

    public ProductDTO updateProduct(
            Long id,
            UpdateProductRequest request) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(id));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(
                request.getCategory()
        );

        Product updated =
                productRepository.save(product);

        return convertToDTO(updated);
    }

    public void deleteProduct(Long id) {

        Product product = productRepository
                .findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(id));

        productRepository.delete(product);
    }
}