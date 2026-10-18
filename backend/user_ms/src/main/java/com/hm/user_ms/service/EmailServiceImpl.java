package com.hm.user_ms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service 
public class EmailServiceImpl implements EmailService {



@Autowired
private JavaMailSender mailSender;


@Value("${frontend.url}")
private String frontendUrl;


@Override 
public void sendResetPasswordEmail(String email,String token){


    String url = frontendUrl + "/reset-password/" + token;


SimpleMailMessage message =new SimpleMailMessage();


message.setTo(email);

message.setSubject("Reset Password");

message.setText("Click this link to reset your password:\n"+url+"\n\nThis link expires in 5 minutes.");


mailSender.send(message);

}

@Override
public void sendOtpEmail(String email,String otp){

SimpleMailMessage message=new SimpleMailMessage();

message.setTo(email);

message.setSubject("Verify your email");

message.setText("Your OTP is : "+otp+"\nOTP expires in 2 minutes.");

mailSender.send(message);

}
}