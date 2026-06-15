package com.sabina.healthystore.service;

import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    public String createCheckoutSession(
            Double amount
    ) throws Exception {

        SessionCreateParams params =

                SessionCreateParams.builder()

                        .setMode(
                                SessionCreateParams.Mode.PAYMENT
                        )

                        .setSuccessUrl(
                                "http://localhost:5173/success"
                        )

                        .setCancelUrl(
                                "http://localhost:5173/cancel"
                        )

                        .addLineItem(

                                SessionCreateParams
                                        .LineItem
                                        .builder()

                                        .setQuantity(1L)

                                        .setPriceData(

                                                SessionCreateParams
                                                        .LineItem
                                                        .PriceData
                                                        .builder()

                                                        .setCurrency("usd")

                                                        .setUnitAmount(

                                                                Math.round(
                                                                        amount * 100
                                                                )
                                                        )

                                                        .setProductData(

                                                                SessionCreateParams
                                                                        .LineItem
                                                                        .PriceData
                                                                        .ProductData
                                                                        .builder()

                                                                        .setName(
                                                                                "Healthy Store Order"
                                                                        )

                                                                        .build()
                                                        )

                                                        .build()
                                        )

                                        .build()
                        )

                        .build();

        Session session =
                Session.create(params);

        return session.getUrl();
    }
}