
package com.hm.profile_ms.dto.filters;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
    public class DoctorFilterDto {

    private List<String> departments;

    private List<String> specializations;

    

    private String sortBy;

    private String sortDirection;
}
