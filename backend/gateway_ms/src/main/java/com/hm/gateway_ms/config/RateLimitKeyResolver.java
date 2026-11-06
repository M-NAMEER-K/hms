package com.hm.gateway_ms.config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import reactor.core.publisher.Mono;


@Configuration
public class RateLimitKeyResolver {


    @Bean
    public KeyResolver userKeyResolver() {


        return exchange -> {


            String path =
                    exchange.getRequest()
                    .getPath()
                    .toString();


            // Public APIs - use IP address
            if(path.equals("/user/login")
                    || path.equals("/user/register/send-otp")
                    || path.equals("/user/register/resend-otp")
                    || path.equals("/user/register/verify-otp")
                    || path.equals("/user/forgot-password")
                    || path.equals("/user/reset-password")){


                return Mono.just(
                    exchange.getRequest()
                    .getRemoteAddress()
                    .getAddress()
                    .getHostAddress()
                );

            }



            // Protected APIs - use JWT user id

            String userId =
                    exchange.getRequest()
                    .getHeaders()
                    .getFirst("X-User-Id");


            if(userId != null){

                return Mono.just(userId);

            }



            // fallback
            return Mono.just(
                    exchange.getRequest()
                    .getRemoteAddress()
                    .getAddress()
                    .getHostAddress()
            );

        };

    }

}