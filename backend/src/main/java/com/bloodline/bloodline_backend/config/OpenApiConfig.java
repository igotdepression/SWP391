package com.bloodline.bloodline_backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Bloodline DNA Testing System API")
                        .description("API documentation for Bloodline DNA Testing Service Management System")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Bloodline Team")
                                .email("contact@bloodline.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://www.apache.org/licenses/LICENSE-2.0.html")))
                .servers(List.of(
                        new Server()
                                .url("http://dna-chain.bloodline:8080")
                                .description("Local Development Server")
                ));
    }
} 