package com.hm.user_ms.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.hm.user_ms.clients.ProfileClient;
import com.hm.user_ms.dto.MonthlyRoleCountDto;
import com.hm.user_ms.dto.RegisterationCountDto;
import com.hm.user_ms.dto.Roles;
import com.hm.user_ms.dto.UserDto;
import com.hm.user_ms.dto.VerifyOtpDto;
import com.hm.user_ms.repository.TempUserRepository;
import com.hm.user_ms.repository.UserRepository;

import jakarta.transaction.Transactional;

import com.hm.user_ms.exception.HmsException;
import org.springframework.beans.factory.annotation.Autowired;

import com.hm.user_ms.entity.TempUser;
import  com.hm.user_ms.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service ("userService")
@Transactional 
public class UserServiceImpl implements UserService {

    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; 
    
    @Autowired 
    private TempUserRepository tempUserRepository;

    @Autowired 
    private EmailService emailService;

    @Autowired 
    private ProfileClient profileClient;
    
    @Override
    public void registerUser(UserDto userDto) throws HmsException{
          Optional<User> opt=userRepository.findByEmail(userDto.getEmail());
            if(opt.isPresent()){
                throw new HmsException("User_Already_Exception");
            }
            if (!userDto.getPassword().equals(userDto.getConfirmPassword())) {
        throw new HmsException("PASSWORD_MISMATCH");
    }
            userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
             Long profileId=null;
               if(userDto.getRole().equals(Roles.DOCTOR)){
                profileId=profileClient.addDoctor(userDto);
                
               }
               else if(userDto.getRole().equals(Roles.PATIENT)){
                profileId=profileClient.addPatient(userDto);
               }

             System.out.println(profileId);

             userDto.setProfileId(profileId);
             userRepository.save(userDto.toEntity());
    }
    
    @Override
    public UserDto loginUser(UserDto userDto) throws HmsException{
        User user=userRepository.findById(userDto.getId()).orElseThrow(()->new HmsException("USER_NOT_FOUND"));
        

        if(!passwordEncoder.matches(userDto.getPassword() , user.getPassword())){
               throw new HmsException("INVALID_CREDENTIALS");
        }
        user.setPassword(null);
        return user.toDto();
    }
    
    @Override
    public UserDto getUserById(Long id) throws HmsException{
           return userRepository.findById(id).orElseThrow(()->new HmsException("USER_NOT_FOUND")).toDto();
    }

    @Override
      public void updateUser(UserDto userDto){
          
      }

      @Override
      public UserDto getUser(String email) throws HmsException{
          return userRepository.findByEmail(email).orElseThrow(()->new HmsException("USER_NOT_FOUND")).toDto();
      }

      @Override 
      public Long getProfile(Long id) throws HmsException{
           User user=userRepository.findById(id).orElseThrow(()->new HmsException("USER_NOT_FOUND"));
           if(user.getRole().equals(Roles.DOCTOR)){
             return profileClient.getDoctor(id);
           }
           else if(user.getRole().equals(Roles.PATIENT)){
            return profileClient.getPatient(id);
           }
           throw new HmsException("INVALID_USER_ROLE");
      }

      @Override 
      public RegisterationCountDto getMonthlyRegisterationCounts() throws HmsException{
        List<MonthlyRoleCountDto> doctorCounts=userRepository.countRegisterationsByRoleGroupedByMonth(Roles.DOCTOR);
        List<MonthlyRoleCountDto> patientCounts=userRepository.countRegisterationsByRoleGroupedByMonth(Roles.PATIENT);
        return new RegisterationCountDto(doctorCounts , patientCounts);
      }


       @Override
public void generateResetToken(String email) throws HmsException{


User user =userRepository.findByEmail(email).orElseThrow(()->new HmsException("USER_NOT_FOUND")
);


String token =UUID.randomUUID().toString();



user.setResetToken(token);


user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(5));


userRepository.save(user);



emailService.sendResetPasswordEmail(email,token);


}

@Override
public void resetPassword(String token,String password) throws HmsException{


User user =userRepository.findByResetToken(token).orElseThrow(()->new HmsException("INVALID_TOKEN"));



if(user.getResetTokenExpiry().isBefore(LocalDateTime.now())){
    throw new HmsException("RESET_LINK_EXPIRED");

}



user.setPassword(passwordEncoder.encode(password));



user.setResetToken(null);

user.setResetTokenExpiry(null);



userRepository.save(user);

}


@Override
public void sendOtp(UserDto userDto)throws HmsException{

       Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());

    if(existingUser.isPresent()){
        throw new HmsException("USER_ALREADY_EXISTS");
    }


TempUser temp=new TempUser();

Optional<TempUser> existing =
        tempUserRepository.findByEmail(userDto.getEmail());

if(existing.isPresent()){
    tempUserRepository.delete(existing.get());
}

String otp =String.valueOf((int)(Math.random()*900000)+100000);
temp.setName(userDto.getName());
temp.setEmail(userDto.getEmail());
temp.setPassword(passwordEncoder.encode(userDto.getPassword()));
temp.setRole(userDto.getRole());
temp.setOtp(otp);
temp.setOtpExpiry(
LocalDateTime.now().plusMinutes(2)
);


tempUserRepository.save(temp);


emailService.sendOtpEmail(userDto.getEmail(),otp);
}

@Override
public void verifyOtp(VerifyOtpDto dto)throws HmsException{

    TempUser temp=tempUserRepository.findByEmail(dto.getEmail()).orElseThrow(()->new HmsException("USER_NOT_FOUND"));


    if(temp.getOtpExpiry().isBefore(LocalDateTime.now())){
        throw new HmsException("OTP_EXPIRED");
    }


    if(!temp.getOtp().equals(dto.getOtp())){
        throw new HmsException("INVALID_OTP");
    }


    User user=new User();

    user.setName(temp.getName());
    user.setEmail(temp.getEmail());
    user.setPassword(temp.getPassword());
    user.setRole(temp.getRole());


    Long profileId=null;


    if(temp.getRole().equals(Roles.DOCTOR)){

        UserDto userDto=new UserDto();

        userDto.setName(temp.getName());
        userDto.setEmail(temp.getEmail());
        userDto.setRole(temp.getRole());

        profileId=profileClient.addDoctor(userDto);

    }
    else if(temp.getRole().equals(Roles.PATIENT)){

        UserDto userDto=new UserDto();

        userDto.setName(temp.getName());
        userDto.setEmail(temp.getEmail());
        userDto.setRole(temp.getRole());

        profileId=profileClient.addPatient(userDto);

    }


    user.setProfileId(profileId);


    userRepository.save(user);


    tempUserRepository.delete(temp);
}

 @Override
 public void resendOtp(String email) throws HmsException{

        TempUser temp = tempUserRepository.findByEmail(email)
            .orElseThrow(() -> new HmsException("USER_NOT_FOUND"));


    String otp = String.valueOf((int)(Math.random()*900000)+100000);


    temp.setOtp(otp);
    temp.setOtpExpiry(LocalDateTime.now().plusMinutes(2));


    tempUserRepository.save(temp);


    emailService.sendOtpEmail(email, otp);
 }
}


