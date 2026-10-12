
package com.hm.gateway_ms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.hm.gateway_ms.filter.TokenFilter;

@Configuration
public class GatewayRouteConfig {
     
        @Autowired
      private TokenFilter tokenFilter;

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

          

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {

        return builder.routes()

                .route("user_ms", r -> r
                        .path("/user/**")
                        .filters(f -> f.filter(tokenFilter.apply(new TokenFilter.Config())))
                        .uri(userServiceUri))
                .route("media_ms", r -> r
                        .path("/media/**")
                        .filters(f -> f.filter(tokenFilter.apply(new TokenFilter.Config())))
                        .uri(mediaServiceUri))
                .route("profile_ms", r -> r
                        .path("/profile/**")
                        .filters(f -> f.filter(tokenFilter.apply(new TokenFilter.Config())))
                        .uri(profileServiceUri))
                .route("pharmacy_ms", r -> r
                        .path("/pharmacy/**")
                        .filters(f -> f.filter(tokenFilter.apply(new TokenFilter.Config())))
                        .uri(pharmacyServiceUri))

                .route("appointment_ms", r -> r
                        .path("/appointment/**")
                        .filters(f -> f.filter(tokenFilter.apply(new TokenFilter.Config())))
                        .uri(appointmentServiceUri))

                .build();
    }
}