package com.hm.gateway_ms;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient 
public class GatewayMsApplication {
   
  


@Bean
CommandLineRunner routes(RouteLocator routeLocator) {
    return args -> routeLocator.getRoutes().subscribe(route -> {
        System.out.println("Route Loaded: " + route.getId() + " -> " + route.getUri());
    });
}
	
	public static void main(String[] args) {
		SpringApplication.run(GatewayMsApplication.class, args);
	}

}
