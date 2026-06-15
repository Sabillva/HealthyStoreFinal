package com.sabina.healthystore.controller;

import com.sabina.healthystore.dto.ProductDTO;
import com.sabina.healthystore.service.ProductService;
import org.springframework.web.bind.annotation.*;
import com.sabina.healthystore.dto.CreateProductRequest;
import com.sabina.healthystore.dto.UpdateProductRequest;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductDTO getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id);
    }

    @PostMapping
    public ProductDTO createProduct(
            @RequestBody CreateProductRequest request) {

        return productService.createProduct(request);
    }

    @PutMapping("/{id}")
    public ProductDTO updateProduct(
            @PathVariable Long id,
            @RequestBody UpdateProductRequest request) {

        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);
    }
}