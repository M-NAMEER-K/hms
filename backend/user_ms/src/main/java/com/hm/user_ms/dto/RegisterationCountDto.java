package com.hm.user_ms.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
public class RegisterationCountDto {
   
       private List<MonthlyRoleCountDto> doctorCounts;
       private List<MonthlyRoleCountDto> patientCounts;
}
