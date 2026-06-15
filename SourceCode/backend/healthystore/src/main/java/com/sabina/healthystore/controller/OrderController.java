package com.sabina.healthystore.controller;

import com.sabina.healthystore.dto.CreateOrderRequest;
import com.sabina.healthystore.dto.OrderDTO;
import com.sabina.healthystore.service.OrderService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.sabina.healthystore.dto.UpdateOrderStatusRequest;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService) {

        this.orderService = orderService;
    }

    @PostMapping
    public OrderDTO createOrder(
            @RequestBody CreateOrderRequest request) {

        return orderService.createOrder(
                request
        );
    }

    @GetMapping
    public List<OrderDTO> getAllOrders() {

        return orderService.getAllOrders();
    }

    @GetMapping("/history/{userName}")
    public List<OrderDTO> getOrderHistory(
            @PathVariable String userName) {

        return orderService
                .getOrderHistory(userName);
    }

    @PutMapping("/{id}/status")
    public OrderDTO updateStatus(
            @PathVariable Long id,
            @RequestBody
            UpdateOrderStatusRequest request) {

        return orderService
                .updateOrderStatus(
                        id,
                        request.getStatus()
                );
    }
}