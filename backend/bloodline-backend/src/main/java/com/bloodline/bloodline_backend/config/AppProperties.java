package com.bloodline.bloodline_backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

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