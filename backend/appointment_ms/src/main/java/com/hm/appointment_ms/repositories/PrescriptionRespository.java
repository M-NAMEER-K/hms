package com.hm.appointment_ms.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.hm.appointment_ms.entity.Prescription;

public interface PrescriptionRespository extends CrudRepository<Prescription , Long>{
      
    Optional<Prescription> findByAppointment_Id(long appointmentId);
    List<Prescription> findAllByPatientId(Long patientId);

    @Query("SELECT p.id from Prescription p WHERE p.patientId=?1")
    List<Long> findAllPreIdsByPatient(Long patientId);
}
