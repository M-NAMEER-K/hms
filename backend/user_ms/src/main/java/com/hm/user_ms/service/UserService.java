package com.hm.user_ms.service;




import com.hm.user_ms.dto.RegisterationCountDto;
import com.hm.user_ms.dto.UserDto;
import com.hm.user_ms.dto.VerifyOtpDto;
import com.hm.user_ms.exception.HmsException;

public interface UserService {
      
      public void registerUser(UserDto userDto) throws HmsException;
      public UserDto loginUser(UserDto userDto) throws HmsException;
      public UserDto getUserById(Long id) throws HmsException;
      public void updateUser(UserDto userDto);
      public UserDto getUser(String email)  throws HmsException;
      public Long getProfile(Long id) throws HmsException;
      public RegisterationCountDto getMonthlyRegisterationCounts() throws HmsException;
      public void generateResetToken(String email) throws HmsException;
      public void resetPassword(String token,String password) throws HmsException;
      public void sendOtp(UserDto userDto)throws HmsException;
      public void verifyOtp(VerifyOtpDto dto)throws HmsException;
      public void resendOtp(String email) throws HmsException;
}
