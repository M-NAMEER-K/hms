package  com.hm.user_ms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import  com.hm.user_ms.exception.HmsException;

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
            .authorizeHttpRequests(auth->auth
            .requestMatchers("/user/login" , "/user/register/send-otp" , "/user/register/verify-otp")
            .permitAll()
            .requestMatchers(req ->"SECRET".equals(req.getHeader("X-Secret-Key")))
            .permitAll().anyRequest().denyAll()

);
return http.build();
    }
}

