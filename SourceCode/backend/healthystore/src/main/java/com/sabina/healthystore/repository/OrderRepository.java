package com.sabina.healthystore.repository;

import com.sabina.healthystore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    List<Order> findByUserName(String userName);
}