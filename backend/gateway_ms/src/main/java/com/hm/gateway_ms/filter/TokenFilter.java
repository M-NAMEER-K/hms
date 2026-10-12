package com.hm.gateway_ms.filter;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;



@Component 
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {
   


    public static final String SECRET="b05319c5798e0af8a69e7b35b63e0a9acc50b0ece4e2e71bcb9eee7864679cbea706d2b3536cf9ac34a0fec4cd9d6ab211516b7122bc149937f88322c30ac947";
      private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
       
      
      public TokenFilter() {
    super(Config.class);
    System.out.println("TokenFilter Bean Created");
}



                    @Override
                    public GatewayFilter apply(Config config){
                       
                       return (exchange , chain)->{

                               System.out.println("Gateway received: " +
                                 exchange.getRequest().getMethod() + " " +
                                 exchange.getRequest().getURI());
                         if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
                               return chain.filter(exchange);
                          }

                        String path = exchange.getRequest().getPath().toString();

if(path.equals("/user/login") ||path.equals("/user/register/send-otp") ||path.equals("/user/register/verify-otp") ||
path.equals("/user/forgot-password")|| path.equals("/user/register/resend-otp") ||path.equals("/user/reset-password")){

    System.out.println("PUBLIC REQUEST");

    return chain.filter(
        exchange.mutate()
                .request(r -> r.header("X-Secret-Key", "SECRET"))
                .build()
    );
}
                          HttpHeaders header=exchange.getRequest().getHeaders();
                         String authHeader = header.getFirst(HttpHeaders.AUTHORIZATION);

if (authHeader == null) {
    throw new RuntimeException("Authorization header is missing");
}
                        
                          if(authHeader==null||!authHeader.startsWith("Bearer ")){
                              throw new RuntimeException("Authorization header is invalid");
                          }
                          String token=authHeader.substring(7);
                           try {

    Claims claims = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();

    System.out.println("JWT VALID");

}
catch(Exception e){

    e.printStackTrace();

    throw new RuntimeException(e.getMessage());

}
                            return chain.filter(
                       exchange.mutate()
                       .request(r->r.header("X-Secret-Key","SECRET"))
                       .build());
                       };
                    }

                     public static class Config{

                     }
        }

