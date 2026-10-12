package com.hm.user_ms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.hm.user_ms.dto.UserDto;
import com.hm.user_ms.dto.Roles;
import reactor.core.publisher.Mono;

@Service 
public class ApiService {
    
    @Autowired 
       private WebClient.Builder webClient;

       public Mono<Long> addProfile(UserDto userDto ){
               if(userDto.getRole().equals(Roles.DOCTOR)){
                  return webClient.build().post().uri("http://localhost:8082/profile/doctor/add")
                         .bodyValue(userDto).retrieve().bodyToMono(Long.class);
               }
               else if(userDto.getRole().equals(Roles.PATIENT)){
                  return webClient.build().post().uri("http://localhost:8082/profile/patient/add")
                         .bodyValue(userDto).retrieve().bodyToMono(Long.class);
               }

               return null;
       }
}
