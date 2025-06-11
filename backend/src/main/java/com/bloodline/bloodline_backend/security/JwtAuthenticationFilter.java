package com.bloodline.bloodline_backend.security;

import java.io.IOException;
import java.util.Collections;
import java.util.stream.Collectors;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtils jwtUtils, CustomUserDetailsService userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        
        log.info("Processing request: {} {}", request.getMethod(), request.getRequestURI());
        log.info("Request headers: {}", Collections.list(request.getHeaderNames()).stream()
                .collect(Collectors.toMap(name -> name, request::getHeader)));
        
        // Skip authentication for login and register endpoints
        if (request.getRequestURI().startsWith("/api/auth/")) {
            log.info("Skipping authentication for auth endpoint: {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }
        
        String jwt = jwtUtils.parseJwt(request);
        log.info("JWT token from request: {}", jwt != null ? "present" : "not present");
        
        if (jwt != null && jwtUtils.validateToken(jwt)) {
            String username = jwtUtils.getUsernameFromToken(jwt);
            log.info("Valid JWT token found for user: {}", username);
            
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                log.info("User authorities: {}", userDetails.getAuthorities());
                
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("Authentication set in SecurityContext for user: {}", username);
            } catch (Exception e) {
                log.error("Error loading user details: {}", e.getMessage());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } else {
            log.debug("No valid JWT token found in request");
        }
        
        filterChain.doFilter(request, response);
    }
}
