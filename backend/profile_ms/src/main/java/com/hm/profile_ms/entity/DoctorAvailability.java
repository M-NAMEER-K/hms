package com.hm.profile_ms.entity;

import java.time.DayOfWeek;
import java.time.LocalTime;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorAvailability {


    @Enumerated(EnumType.STRING)
    private DayOfWeek day;


    private LocalTime startTime;


    private LocalTime endTime;



}