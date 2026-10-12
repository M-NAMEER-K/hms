package  com.hm.user_ms.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import  com.hm.user_ms.config.FeignClientInterceptor;
import com.hm.user_ms.config.FeignErrorDecoder;
import  com.hm.user_ms.dto.UserDto;



@FeignClient(name="profile-ms",url="${profile-ms.url}",configuration={FeignClientInterceptor.class,FeignErrorDecoder.class})
public interface ProfileClient {
    
    @PostMapping("/profile/doctor/add")
     Long addDoctor(@RequestBody UserDto userDto);

     @PostMapping("/profile/patient/add")
     Long addPatient(@RequestBody UserDto userDto);

     @GetMapping("/profile/doctor/getProfileId/{id}")
      Long getDoctor(@PathVariable Long id);

     @GetMapping("/profile/patient/getProfileId/{id}")
      Long getPatient(@PathVariable Long id);
  
}
