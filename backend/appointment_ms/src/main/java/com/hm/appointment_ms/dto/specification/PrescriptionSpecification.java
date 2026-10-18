package com.hm.appointment_ms.dto.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.hm.appointment_ms.dto.filters.PrescriptionFilterDto;
import com.hm.appointment_ms.entity.Prescription;

import jakarta.persistence.criteria.Predicate;

public class PrescriptionSpecification {

    public static Specification<Prescription> filter( PrescriptionFilterDto request, Long patientId) {

        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            // Always filter by patient
            predicates.add(
                    criteriaBuilder.equal(root.get("patientId"), patientId)
            );

            // Doctor Filter
            if (request.getDoctorIds() != null &&
                !request.getDoctorIds().isEmpty()) {

                predicates.add(
                        root.get("doctorId").in(request.getDoctorIds())
                );
            }

          

           

            return criteriaBuilder.and(
                    predicates.toArray(new Predicate[0])
            );
        };
    }

}