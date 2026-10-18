package com.hm.appointment_ms.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.hm.appointment_ms.dto.filters.PrescriptionFilterDto;
import com.hm.appointment_ms.dto.specification.PrescriptionSpecification;


import org.springframework.stereotype.Service;

import com.hm.appointment_ms.clients.ProfileClient;
import com.hm.appointment_ms.dto.DoctorName;
import com.hm.appointment_ms.dto.PrescriptionDetailsDto;
import com.hm.appointment_ms.dto.PrescriptionDto;

import com.hm.appointment_ms.dto.MedicineDto;
import com.hm.appointment_ms.entity.Prescription;
import com.hm.appointment_ms.exception.HmsException;

import com.hm.appointment_ms.repositories.PrescriptionRespository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
@Transactional 
public class PrescriptionServiceImpl implements PrescriptionService{
    
       private final PrescriptionRespository prescriptionRespository;
       private final MedicineService medicineService;
       private final ProfileClient profileClient;

       @Override 
       public Long savePrescription(PrescriptionDto request){
          Long prescriptionId=prescriptionRespository.save(request.toEntity()).getId();
          request.getMedicines().forEach(medicine -> {
            medicine.setPrescriptionId(prescriptionId);
          });
     request.setMedicines(medicineService.saveAllMedicines(request.getMedicines()));
    
          return prescriptionId;
       }

       @Override 
       public PrescriptionDto getPrescriptionByAppointmentId(Long appointmentId) throws HmsException{
           PrescriptionDto prescriptionDto=prescriptionRespository.findByAppointment_Id(appointmentId).orElseThrow(()-> new HmsException("PRESCRIPTION_NOT_FOUND")).toDto();
             prescriptionDto.setMedicines(medicineService.getAllMedicinesByPrescriptionId(prescriptionDto.getId()));  
           return prescriptionDto;
       }

       @Override 
       public PrescriptionDto getPrescriptionById(Long prescriptionId) throws HmsException{
             PrescriptionDto prescriptionDto=prescriptionRespository.findById(prescriptionId).orElseThrow(()-> new HmsException("PRESCRIPTION_NOT_FOUND")).toDto();
              prescriptionDto.setMedicines(medicineService.getAllMedicinesByPrescriptionId(prescriptionDto.getId()));
      
       return prescriptionDto;
            }

       @Override
        public Page<PrescriptionDetailsDto> getPrescriptionsByPatientId( Long patientId,PrescriptionFilterDto request,int page,int size) throws HmsException {

    Sort sort = Sort.by( Sort.Direction.fromString(request.getSortDirection()), request.getSortBy());

    Pageable pageable = PageRequest.of(page, size, sort);

    Page<Prescription> prescriptionPage =
            prescriptionRespository.findAll( PrescriptionSpecification.filter(request, patientId), pageable);

    List<PrescriptionDetailsDto> prescriptionDetails =
            prescriptionPage.getContent()
                    .stream()
                    .map(Prescription::toDetails)
                    .toList();

    // Medicines
    prescriptionDetails.forEach(details -> {
        details.setMedicines(
                medicineService.getAllMedicinesByPrescriptionId(details.getId())
        );
    });

    // Doctor Names
    List<Long> doctorIds = prescriptionDetails.stream()
            .map(PrescriptionDetailsDto::getDoctorId)
            .distinct()
            .toList();

    if (!doctorIds.isEmpty()) {

        List<DoctorName> doctorNames =
                profileClient.getDoctorsById(doctorIds);

        Map<Long, String> doctorMap =
                doctorNames.stream()
                        .collect(Collectors.toMap(
                                DoctorName::getId,
                                DoctorName::getName));

        prescriptionDetails.forEach(details -> {

            String doctorName =
                    doctorMap.get(details.getDoctorId());

            details.setDoctorName(
                    doctorName != null
                            ? doctorName
                            : "Unknown Doctor");
        });
    }

    return new PageImpl<>(
            prescriptionDetails,
            pageable,
            prescriptionPage.getTotalElements());
}

                @Override
                 public List<PrescriptionDetailsDto> getPrescriptions() throws HmsException{
                   List<Prescription> prescriptions=(List<Prescription>)prescriptionRespository.findAll();
                   List<PrescriptionDetailsDto> prescriptionDetails=prescriptions.stream().map(Prescription::toDetails).toList();
                   List<Long> doctorIds=prescriptionDetails.stream().map(PrescriptionDetailsDto:: getDoctorId).distinct().toList();
                   List<Long> patientIds=prescriptionDetails.stream().map(PrescriptionDetailsDto:: getPatientId).distinct().toList();
                   List<DoctorName> doctorNames=profileClient.getDoctorsById(doctorIds);
                   List<DoctorName> patientNames=profileClient.getPatientsById(patientIds);
                   Map<Long , String> doctorMap= doctorNames.stream().collect(Collectors.toMap(DoctorName::getId, DoctorName::getName));
                   Map<Long , String> patientMap= patientNames.stream().collect(Collectors.toMap(DoctorName::getId, DoctorName::getName));
                   prescriptionDetails.forEach(details->{
                      String doctorName = doctorMap.get(details.getDoctorId());
                      String patientName = patientMap.get(details.getPatientId());

                      if(doctorName!=null){
                        details.setDoctorName(doctorName);
                      }
                      else{
                        details.setDoctorName("Unknown Doctor");
                      }

                      if(patientName!=null){
                        details.setPatientName(patientName);
                      }
                      else{
                        details.setPatientName("Unknown Patient");
                      }

                   });
                  return prescriptionDetails;
                 }

          @Override 
             public List<MedicineDto> getMedicineByPatientId(Long patientId) throws HmsException{
              List<Long> pIds=prescriptionRespository.findAllPreIdsByPatient(patientId);
                return medicineService.getMedicinesByPrescriptionIds(pIds);
             }

}
