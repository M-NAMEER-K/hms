package com.hm.appointment_ms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.hm.appointment_ms.entity.AppointmentRecord;

public interface AppointmentRecordRepository extends  CrudRepository<AppointmentRecord , Long>{
        Optional<AppointmentRecord>findByAppointment_Id(Long appointmentId);

      
        List<AppointmentRecord> findByPatientId(Long patientId);

        Boolean existsByAppointment_Id(Long appointmentId);
}
