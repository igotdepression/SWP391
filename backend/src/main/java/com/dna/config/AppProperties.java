package com.dna.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    
    private final Jwt jwt = new Jwt();
    
    public Jwt getJwt() {
        return jwt;
    }
    
    @Getter
    @Setter
    public static class Jwt {
        private String secret;
        private int expiration;
    }
}