package  com.hm.user_ms.api;
import org.springframework.security.core.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import  com.hm.user_ms.dto.LoginResponseDto;
import com.hm.user_ms.dto.RegisterationCountDto;
import  com.hm.user_ms.dto.LoginDto;
import  com.hm.user_ms.dto.ResponseDto;
import  com.hm.user_ms.dto.UserDto;
import com.hm.user_ms.dto.VerifyOtpDto;
import  com.hm.user_ms.service.UserService;
import  com.hm.user_ms.exception.HmsException;
import  com.hm.user_ms.jwt.JwtUtil;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/user")
@Validated
public class UserApi {
          
    @Autowired
     private UserService userService;

     @Autowired
     private UserDetailsService userDetailsService;

     @Autowired
     private AuthenticationManager authenticationManager;

     @Autowired 
     private JwtUtil jwtUtil;

    

     @PostMapping("/login")
     public ResponseEntity<LoginResponseDto> loginUser(@RequestBody LoginDto loginDto) throws HmsException{
               try{
                

     authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
                    
               }
               catch(AuthenticationException e){
           throw new HmsException("INVALID_CREDENTIALS");
               }
               UserDetails userDetails=userDetailsService.loadUserByUsername(loginDto.getEmail());
                String jwt=jwtUtil.generateToken(userDetails);
                UserDto user=userService.getUser(loginDto.getEmail());
                user.setPassword(null);
                   return ResponseEntity.ok(new LoginResponseDto(jwt,user));
     }

     @GetMapping("/getProfile/{id}")
     public ResponseEntity<Long> getProfile(@PathVariable  Long id) throws HmsException{
        return new ResponseEntity<>(userService.getProfile(id),HttpStatus.OK);
     }

     @GetMapping("/getRegisterationCounts")
     public ResponseEntity<RegisterationCountDto> getMonthlyRegisterationCounts() throws HmsException{
         return new ResponseEntity<>(userService.getMonthlyRegisterationCounts(),HttpStatus.OK);
     }

     @PostMapping("/forgot-password")
     public ResponseEntity<String> forgotPassword(@RequestParam String email)throws HmsException{

      userService.generateResetToken(email);

     return ResponseEntity.ok("Reset link sent to email");

}
    @PostMapping("/reset-password")
        public ResponseEntity<String> resetPassword(@RequestParam String token,@RequestParam String password) throws HmsException{


         userService.resetPassword(token,password); 


          return ResponseEntity.ok("Password changed successfully");

}

  @PostMapping("/register/send-otp")
     public ResponseEntity<String> sendOtp(@RequestBody UserDto userDto)throws HmsException{
     userService.sendOtp(userDto);
     return ResponseEntity.ok("OTP sent");
}

  @PostMapping("/register/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody VerifyOtpDto dto)throws HmsException{
      userService.verifyOtp(dto);
   return ResponseEntity.ok("OTP verified");
}

  @PostMapping("/register/resend-otp")
public ResponseEntity<String> resendOtp(@RequestParam String email)
        throws HmsException {


    userService.resendOtp(email);

    return ResponseEntity.ok("OTP resent successfully");

}

}
