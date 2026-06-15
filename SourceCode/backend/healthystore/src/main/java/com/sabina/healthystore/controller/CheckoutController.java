package com.sabina.healthystore.controller;

import com.sabina.healthystore.dto.CheckoutResponse;
import com.sabina.healthystore.service.StripeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "*")
public class CheckoutController {

    private final StripeService stripeService;

    public CheckoutController(
            StripeService stripeService
    ) {

        this.stripeService =
                stripeService;
    }

    @PostMapping
    public CheckoutResponse checkout(
            @RequestParam Double amount
    ) throws Exception {

        String url =
                stripeService
                        .createCheckoutSession(
                                amount
                        );

        return new CheckoutResponse(
                url
        );
    }
}