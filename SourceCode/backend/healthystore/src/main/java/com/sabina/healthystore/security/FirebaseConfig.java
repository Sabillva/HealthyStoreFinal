package com.sabina.healthystore.security;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() {

        try {

            InputStream serviceAccount =
                    getClass()
                            .getClassLoader()
                            .getResourceAsStream(
                                    "firebase/healthy-store-final-firebase-adminsdk-fbsvc-7c022d612d.json"
                            );

            FirebaseOptions options =
                    FirebaseOptions.builder()
                            .setCredentials(
                                    GoogleCredentials
                                            .fromStream(
                                                    serviceAccount
                                            )
                            )
                            .build();

            if (FirebaseApp.getApps().isEmpty()) {

                FirebaseApp.initializeApp(
                        options
                );
            }

            System.out.println(
                    "Firebase initialized successfully"
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Firebase initialization failed",
                    e
            );
        }
    }
}