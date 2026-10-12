package  com.hm.user_ms.jwt;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import  com.hm.user_ms.dto.UserDto;
import  com.hm.user_ms.exception.HmsException;
import  com.hm.user_ms.service.UserService;


@Service 
public class MyUserDetailsService implements UserDetailsService {

    @Autowired 
    private UserService userService;
        
    @Override 
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
            try{
                UserDto dto=userService.getUser(username);
                return new CustomUserDetails(dto.getId(),dto.getEmail(),dto.getPassword(),dto.getRole(),dto.getName(),Collections.emptyList());
            }
            catch(HmsException e){
                e.printStackTrace();
            }
            return null;
    }
}
