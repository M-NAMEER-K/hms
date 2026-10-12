package com.hm.user_ms.service;


public interface EmailService {
    public void sendResetPasswordEmail(String email,String token);
    public void sendOtpEmail(String email,String otp);
}