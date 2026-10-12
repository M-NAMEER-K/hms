package  com.hm.user_ms.jwt;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hm.user_ms.dto.Roles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
public class CustomUserDetails implements UserDetails {

       private Long id;
       private String username;
       private String password;
       private Roles role;
       private String name;
       private Collection<? extends GrantedAuthority>authorities;
}
