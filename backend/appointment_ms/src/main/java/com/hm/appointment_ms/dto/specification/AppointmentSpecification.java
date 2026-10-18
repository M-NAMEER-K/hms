 package com.hm.appointment_ms.dto.specification;


import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.hm.appointment_ms.dto.filters.AppointmentFilterDto;
import com.hm.appointment_ms.entity.Appointment;

import jakarta.persistence.criteria.Predicate;


public class AppointmentSpecification {


public static Specification<Appointment> filter( AppointmentFilterDto request, Long patientId){

return (root,query,criteriaBuilder)->{


List<Predicate> predicates = new ArrayList<>();


// always patient filter

predicates.add(criteriaBuilder.equal(root.get("patientId"),patientId));

// status filter

if(request.getStatus()!=null && !request.getStatus().isEmpty()){

predicates.add(root.get("status").in(request.getStatus()));
}



// reason filter

if(request.getFromDate()!=null){

    predicates.add(
        criteriaBuilder.greaterThanOrEqualTo(
            root.get("appointmentTime"),
            request.getFromDate().atStartOfDay()
        )
    );

}

if(request.getToDate()!=null){

    predicates.add(
        criteriaBuilder.lessThanOrEqualTo(
            root.get("appointmentTime"),
            request.getToDate().atTime(23,59,59)
        )
    );

}



// doctor filter

if(request.getDoctorId()!=null){

predicates.add(criteriaBuilder.equal(root.get("doctorId"),request.getDoctorId()));
}



// date range




return criteriaBuilder.and(predicates.toArray(new Predicate[0]));


};


}

} 
