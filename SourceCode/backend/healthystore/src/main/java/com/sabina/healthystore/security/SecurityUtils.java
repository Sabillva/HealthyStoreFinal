package com.sabina.healthystore.security;

import com.google.firebase.auth.FirebaseToken;

public class SecurityUtils {

    public static boolean isAdmin(
            FirebaseToken token) {

        Object adminClaim =
                token.getClaims()
                        .get("admin");

        return adminClaim instanceof Boolean
                && (Boolean) adminClaim;
    }
}