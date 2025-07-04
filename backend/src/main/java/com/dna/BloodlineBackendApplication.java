package com.dna;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.dna.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties({AppProperties.class})
public class BloodlineBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BloodlineBackendApplication.class, args);
    }
}
