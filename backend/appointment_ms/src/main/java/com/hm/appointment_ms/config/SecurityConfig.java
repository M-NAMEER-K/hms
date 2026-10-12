package com.hm.appointment_ms.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;



@Configuration 
@EnableWebSecurity
public class SecurityConfig {
    
   @Bean 
   public PasswordEncoder passwordEncoder(){
      return new BCryptPasswordEncoder();
   }
   
   @Bean 
   AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception{
    return builder.getAuthenticationManager();
   }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .authorizeHttpRequests(auth -> auth

    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

    .requestMatchers(req ->
        "SECRET".equals(req.getHeader("X-Secret-Key")))
    .permitAll()

    .anyRequest().denyAll()
);

return http.build();
    }
}