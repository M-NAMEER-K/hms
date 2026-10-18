package com.hm.appointment_ms.Service;

import java.util.List;
import org.springframework.data.domain.Page;

import com.hm.appointment_ms.dto.filters.PrescriptionFilterDto;
import com.hm.appointment_ms.dto.PrescriptionDetailsDto;
import com.hm.appointment_ms.dto.PrescriptionDto;
import com.hm.appointment_ms.dto.filters.PrescriptionFilterDto;
import com.hm.appointment_ms.dto.MedicineDto;
import com.hm.appointment_ms.exception.HmsException;

public interface PrescriptionService {
       public Long savePrescription(PrescriptionDto request);
       public PrescriptionDto getPrescriptionByAppointmentId(Long appointmentId) throws HmsException;
       public PrescriptionDto getPrescriptionById(Long Prescription) throws HmsException;
       public Page<PrescriptionDetailsDto> getPrescriptionsByPatientId( Long patientId, PrescriptionFilterDto request, int page, int size) throws HmsException;
       public List<PrescriptionDetailsDto>  getPrescriptions() throws HmsException;
       public List<MedicineDto> getMedicineByPatientId(Long patientId) throws HmsException;
}
