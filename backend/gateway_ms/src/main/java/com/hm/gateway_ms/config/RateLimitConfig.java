package com.hm.gateway_ms.config;


import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;


@Configuration
public class RateLimitConfig {


    // Login, OTP, Forgot Password
    @Bean("authRateLimiter")
    @Primary
    public RedisRateLimiter authRateLimiter(){

        return new RedisRateLimiter(
                1,
                2
        );

    }



    // Normal user APIs
    @Bean("userRateLimiter")
    public RedisRateLimiter userRateLimiter(){

        return new RedisRateLimiter(
                5,
                10
        );

    }



    // Appointment APIs
    @Bean("appointmentRateLimiter")
    public RedisRateLimiter appointmentRateLimiter(){

        return new RedisRateLimiter(
                5,
                10
        );

    }



    // Pharmacy APIs
    @Bean("pharmacyRateLimiter")
    public RedisRateLimiter pharmacyRateLimiter(){

        return new RedisRateLimiter(
                10,
                20
        );

    }



    // Media upload APIs
    @Bean("mediaRateLimiter")
    public RedisRateLimiter mediaRateLimiter(){

        return new RedisRateLimiter(
                5,
                10
        );

    }
    @Bean("paymentRateLimiter")
public RedisRateLimiter paymentRateLimiter() {

    return new RedisRateLimiter(
            5,
            10
    );

}

    

}