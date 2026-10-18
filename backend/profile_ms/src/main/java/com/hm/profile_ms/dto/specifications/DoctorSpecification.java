package com.hm.profile_ms.dto.specifications;


import java.util.List;
import java.util.ArrayList;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import com.hm.profile_ms.dto.filters.DoctorFilterDto;
import com.hm.profile_ms.entity.Doctor;;

public class DoctorSpecification {

    public static Specification<Doctor> filter(DoctorFilterDto request){

        return (root,query,cb)->{

            List<Predicate> predicates = new ArrayList<>();

            if(request.getDepartments()!=null && !request.getDepartments().isEmpty()){
                predicates.add(root.get("department").in(request.getDepartments()));
            }

            if(request.getSpecializations()!=null && !request.getSpecializations().isEmpty()){
                predicates.add(root.get("specialization").in(request.getSpecializations()));
            }

          

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}