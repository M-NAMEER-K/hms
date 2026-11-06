package com.hm.appointment_ms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorAvailabilityDto {

    private DayOfWeek day;

    private LocalTime startTime;

    private LocalTime endTime;

}