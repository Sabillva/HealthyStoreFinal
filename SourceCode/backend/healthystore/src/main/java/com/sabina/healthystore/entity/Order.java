package com.sabina.healthystore.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private Double totalPrice;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}