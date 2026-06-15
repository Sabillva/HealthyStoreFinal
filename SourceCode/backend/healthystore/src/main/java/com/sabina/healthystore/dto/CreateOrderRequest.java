package com.sabina.healthystore.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {

    private String userName;

    private List<CreateOrderItemRequest> items;
}