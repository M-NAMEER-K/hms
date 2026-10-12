package com.hm.appointment_ms.Service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.hm.appointment_ms.dto.DoctorDto;
import com.hm.appointment_ms.dto.PatientDto;

import reactor.core.publisher.Mono;

@Service 
public class ApiService {
    
    @Autowired 
       private WebClient.Builder webClient;

       public Mono<Boolean> isDoctorExists(Long id){
            

        return webClient.build().get().uri("http://localhost:8082/profile/doctor/exists/"+ id).retrieve().bodyToMono(Boolean.class);
       }

       public Mono<Boolean> isPatientExists(Long id){
            

        return webClient.build().get().uri("http://localhost:8082/profile/patient/exists/"+ id).retrieve().bodyToMono(Boolean.class);
       }
      
        public Mono<PatientDto> getPatientById (Long id){
           return webClient.build().get().uri("http://localhost:8082/profile/patient/get/"+ id).retrieve().bodyToMono(PatientDto.class);
        }
        public Mono<DoctorDto> getDoctorById (Long id){
           return webClient.build().get().uri("http://localhost:8082/profile/doctor/get/"+ id).retrieve().bodyToMono(DoctorDto.class);
        }
               
       
}
