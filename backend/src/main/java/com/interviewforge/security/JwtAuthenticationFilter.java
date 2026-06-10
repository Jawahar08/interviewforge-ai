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
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
) throws ServletException, IOException {

    System.out.println("===========");
    System.out.println("URI: " + request.getRequestURI());
    System.out.println("METHOD: " + request.getMethod());
    System.out.println("AUTH HEADER: " + request.getHeader("Authorization"));
    System.out.println("===========");

    String authHeader = request.getHeader("Authorization");

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
    }

        String token = authHeader.substring(7);

        try {

    String email = jwtService.extractEmail(token);

    UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    Collections.emptyList()
            );

    SecurityContextHolder
            .getContext()
            .setAuthentication(authentication);

    System.out.println("Authenticated User: " + email);

} catch (Exception e) {

    System.out.println("Invalid JWT Token");

}

        filterChain.doFilter(request, response);
    }
}