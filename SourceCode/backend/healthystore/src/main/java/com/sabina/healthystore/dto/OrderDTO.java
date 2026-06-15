package com.sabina.healthystore.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {

    private Long id;

    private String userName;

    private Double totalPrice;

    private LocalDateTime createdAt;

    private List<OrderItemDTO> items;

    private String status;
}