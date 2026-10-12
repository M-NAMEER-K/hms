package com.hm.user_ms.entity;

import java.time.LocalDateTime;

import com.hm.user_ms.dto.Roles;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Getter 
@Setter 
@AllArgsConstructor 
@NoArgsConstructor 
public class TempUser {


@Id 
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


private String name;

private String email;

private String password;


@Enumerated(EnumType.STRING)
private Roles role;


private String otp;


private LocalDateTime otpExpiry;

}
