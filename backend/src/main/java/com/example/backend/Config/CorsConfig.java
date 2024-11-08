package com.example.backend.Config;import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // allowed methods
                .allowedHeaders("*") // allow all headers, or specify as needed
                .allowCredentials(true); // allow credentials like cookies
    }
}
