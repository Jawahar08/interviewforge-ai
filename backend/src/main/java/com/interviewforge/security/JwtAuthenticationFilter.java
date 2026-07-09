package com.interviewforge.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(
            JwtService jwtService
    ) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");

        System.out.println("===========");
        System.out.println(
                "URI: " + request.getRequestURI()
        );
        System.out.println(
                "METHOD: " + request.getMethod()
        );
        System.out.println(
                "AUTH HEADER PRESENT: "
                        + (authHeader != null)
        );
        System.out.println("===========");

        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        String token =
                authHeader.substring(7);

        try {

            if (SecurityContextHolder
                    .getContext()
                    .getAuthentication() == null) {

                String email =
                        jwtService.extractEmail(token);

                if (email != null
                        && !email.isBlank()) {

                    UsernamePasswordAuthenticationToken
                            authentication =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    Collections.emptyList()
                            );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication
                            );

                    System.out.println(
                            "Authenticated User: "
                                    + email
                    );
                }
            }

        } catch (Exception exception) {

            SecurityContextHolder.clearContext();

            System.out.println(
                    "Invalid JWT Token: "
                            + exception.getMessage()
            );
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}