package com.hm.appointment_ms.Service;

import java.util.List;

import com.hm.appointment_ms.dto.PrescriptionDetailsDto;
import com.hm.appointment_ms.dto.PrescriptionDto;
import com.hm.appointment_ms.dto.MedicineDto;
import com.hm.appointment_ms.exception.HmsException;

public interface PrescriptionService {
       public Long savePrescription(PrescriptionDto request);
       public PrescriptionDto getPrescriptionByAppointmentId(Long appointmentId) throws HmsException;
       public PrescriptionDto getPrescriptionById(Long Prescription) throws HmsException;
       public List<PrescriptionDetailsDto> getPrescriptionsByPatientId(Long patientId) throws HmsException;
       public List<PrescriptionDetailsDto>  getPrescriptions() throws HmsException;
       public List<MedicineDto> getMedicineByPatientId(Long patientId) throws HmsException;
}
