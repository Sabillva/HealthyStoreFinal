package com.sabina.healthystore.service;

import com.sabina.healthystore.exception.InsufficientStockException;
import com.sabina.healthystore.repository.OrderItemRepository;
import com.sabina.healthystore.repository.OrderRepository;
import com.sabina.healthystore.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.sabina.healthystore.dto.*;
import com.sabina.healthystore.entity.Order;
import com.sabina.healthystore.entity.OrderItem;
import com.sabina.healthystore.entity.Product;
import com.sabina.healthystore.exception.ProductNotFoundException;
import com.sabina.healthystore.entity.OrderStatus;
import com.sabina.healthystore.exception.OrderNotFoundException;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            ProductRepository productRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }

    public OrderDTO createOrder(
            CreateOrderRequest request) {

        Order order = new Order();

        order.setUserName(request.getUserName());

        order.setStatus(
                OrderStatus.PENDING
        );

        Order savedOrder =
                orderRepository.save(order);

        double totalPrice = 0.0;

        List<OrderItemDTO> itemDTOs =
                new ArrayList<>();

        for (CreateOrderItemRequest itemRequest
                : request.getItems()) {

            Product product =
                    productRepository
                            .findById(
                                    itemRequest.getProductId()
                            )
                            .orElseThrow(() ->
                                    new ProductNotFoundException(
                                            itemRequest.getProductId()
                                    ));

            if (product.getStock()
                    < itemRequest.getQuantity()) {

                throw new InsufficientStockException(
                        product.getName()
                );
            }

            OrderItem orderItem =
                    new OrderItem();

            orderItem.setOrder(savedOrder);

            orderItem.setProduct(product);

            orderItem.setQuantity(
                    itemRequest.getQuantity()
            );

            orderItem.setPrice(
                    product.getPrice()
            );

            orderItemRepository.save(orderItem);

            product.setStock(
                    product.getStock()
                            - itemRequest.getQuantity()
            );

            productRepository.save(product);

            totalPrice +=
                    product.getPrice()
                            * itemRequest.getQuantity();

            OrderItemDTO itemDTO =
                    new OrderItemDTO();

            itemDTO.setProductName(
                    product.getName()
            );

            itemDTO.setQuantity(
                    itemRequest.getQuantity()
            );

            itemDTO.setPrice(
                    product.getPrice()
            );

            itemDTOs.add(itemDTO);
        }

        savedOrder.setTotalPrice(totalPrice);

        orderRepository.save(savedOrder);

        OrderDTO dto =
                new OrderDTO();

        dto.setId(savedOrder.getId());

        dto.setUserName(
                savedOrder.getUserName()
        );

        dto.setTotalPrice(totalPrice);

        dto.setCreatedAt(
                savedOrder.getCreatedAt()
        );

        dto.setItems(itemDTOs);

        return dto;
    }

    public OrderDTO updateOrderStatus(
            Long orderId,
            String status) {

        Order order =
                orderRepository
                        .findById(orderId)
                        .orElseThrow(() ->
                                new OrderNotFoundException(
                                        orderId
                                ));

        order.setStatus(
                OrderStatus.valueOf(status)
        );

        Order updated =
                orderRepository.save(order);

        return convertOrderToDTO(updated);
    }

    public List<OrderDTO> getOrderHistory(
            String userName) {

        List<Order> orders =
                orderRepository.findByUserName(userName);

        return orders.stream()
                .map(this::convertOrderToDTO)
                .toList();
    }

    public List<OrderDTO> getAllOrders() {

        return orderRepository
                .findAll()
                .stream()
                .map(this::convertOrderToDTO)
                .toList();
    }



    private OrderDTO convertOrderToDTO(
            Order order) {

        List<OrderItem> orderItems =
                orderItemRepository
                        .findByOrderId(order.getId());

        List<OrderItemDTO> itemDTOs =
                orderItems.stream()
                        .map(item -> {

                            OrderItemDTO dto =
                                    new OrderItemDTO();

                            dto.setProductName(
                                    item.getProduct()
                                            .getName()
                            );

                            dto.setQuantity(
                                    item.getQuantity()
                            );

                            dto.setPrice(
                                    item.getPrice()
                            );

                            return dto;
                        })
                        .toList();

        OrderDTO dto =
                new OrderDTO();

        dto.setId(order.getId());

        dto.setUserName(
                order.getUserName()
        );

        dto.setTotalPrice(
                order.getTotalPrice()
        );

        dto.setCreatedAt(
                order.getCreatedAt()
        );

        dto.setStatus(
                order.getStatus() == null
                        ? "PENDING"
                        : order.getStatus().name()
        );

        dto.setItems(itemDTOs);

        return dto;
    }
}