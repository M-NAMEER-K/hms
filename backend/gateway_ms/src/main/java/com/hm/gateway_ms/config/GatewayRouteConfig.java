
package com.hm.gateway_ms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.hm.gateway_ms.filter.TokenFilter;

@Configuration
public class GatewayRouteConfig {
     
        @Autowired
      private TokenFilter tokenFilter;

      @Autowired
      @Qualifier ("authRateLimiter")
private RedisRateLimiter authRateLimiter;

@Autowired
@Qualifier ("userRateLimiter")
private RedisRateLimiter userRateLimiter;

@Autowired
@Qualifier ("appointmentRateLimiter")
private RedisRateLimiter appointmentRateLimiter;

@Autowired
@Qualifier ("pharmacyRateLimiter")
private RedisRateLimiter pharmacyRateLimiter;

@Autowired
@Qualifier ("mediaRateLimiter")
private RedisRateLimiter mediaRateLimiter;

@Autowired
@Qualifier("paymentRateLimiter")
private RedisRateLimiter paymentRateLimiter;

      @Autowired 
      private KeyResolver userKeyResolver;

      @Value("${user.service.uri}")
          private String userServiceUri;

          @Value("${pharmacy.service.uri}")
          private String pharmacyServiceUri;

          @Value("${profile.service.uri}")
          private String profileServiceUri;

          @Value("${media.service.uri}")
          private String mediaServiceUri;

          @Value("${appointment.service.uri}")
          private String appointmentServiceUri;

          @Value("${payment.service.uri}")
          private String paymentServiceUri;

          

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {

        return builder.routes()

                .route("user_ms", r -> r
                        .path("/user/**")
                        .filters(f -> f
.filter(tokenFilter.apply(new TokenFilter.Config()))
.requestRateLimiter(config -> config
.setRateLimiter(authRateLimiter)
.setKeyResolver(userKeyResolver)
)
)

                        .uri(userServiceUri))
                        .route("payment_ms", r -> r
        .path("/payment/**")
        .filters(f -> f
                .filter(tokenFilter.apply(new TokenFilter.Config()))
                .requestRateLimiter(config -> config
                        .setRateLimiter(paymentRateLimiter)
                        .setKeyResolver(userKeyResolver)
                )
        )
        .uri(paymentServiceUri))
                .route("media_ms", r -> r
                        .path("/media/**")
                        .filters(f -> f
.filter(tokenFilter.apply(new TokenFilter.Config()))
.requestRateLimiter(config -> config
.setRateLimiter(mediaRateLimiter)
.setKeyResolver(userKeyResolver)
)
)
                        .uri(mediaServiceUri))
                .route("profile_ms", r -> r
                        .path("/profile/**")
                         .filters(f -> f
.filter(tokenFilter.apply(new TokenFilter.Config()))
.requestRateLimiter(config -> config
.setRateLimiter(userRateLimiter)
.setKeyResolver(userKeyResolver)
)
)
                        .uri(profileServiceUri))
                .route("pharmacy_ms", r -> r
                        .path("/pharmacy/**")
                         .filters(f -> f
.filter(tokenFilter.apply(new TokenFilter.Config()))
.requestRateLimiter(config -> config
.setRateLimiter(pharmacyRateLimiter)
.setKeyResolver(userKeyResolver)
)
)
                        .uri(pharmacyServiceUri))

                .route("appointment_ms", r -> r
                        .path("/appointment/**")
                        .filters(f -> f
.filter(tokenFilter.apply(new TokenFilter.Config()))
.requestRateLimiter(config -> config
.setRateLimiter(appointmentRateLimiter)
.setKeyResolver(userKeyResolver)
)
)
                        .uri(appointmentServiceUri))

                .build();
    }
}