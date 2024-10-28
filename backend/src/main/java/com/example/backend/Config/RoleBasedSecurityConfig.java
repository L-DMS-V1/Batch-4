package com.example.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

//import com.example.backend.services.UserService;

@Configuration
public class RoleBasedSecurityConfig {
    @Bean
    public SecurityFilterChain roleBasedSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/employee/**").hasRole("EMPLOYEE")   // Only accessible to employees
                .requestMatchers("/api/manager/**").hasRole("MANAGER")     // Only accessible to managers
                .requestMatchers("/api/admin/**").hasRole("ADMIN")         // Only accessible to admins
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
       
