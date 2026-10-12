package com.hm.appointment_ms.Service;

import java.util.List;

import com.hm.appointment_ms.dto.AppointmentRecordDto;
import com.hm.appointment_ms.dto.RecordDetailsDto;
import com.hm.appointment_ms.exception.HmsException;

public interface AppointmentRecordService {
       
    public Long createAppointmentRecord(AppointmentRecordDto request) throws  HmsException;
    public void updateAppointmentRecord(AppointmentRecordDto request) throws HmsException;
    public AppointmentRecordDto getAppointmentRecordByAppointmentId(Long appointmentId) throws HmsException;
    public AppointmentRecordDto getAppointmentRecordById(Long recordId) throws HmsException;
    public AppointmentRecordDto getAppointmentRecordDetailsByAppointmentId(Long appointmentId) throws HmsException;
    public List<RecordDetailsDto> getRecordsByPatientId(Long patientId) throws HmsException;
    Boolean isRecordExists(Long appointmentId) throws HmsException;
}
