export interface Medicine {
  medicine: string;
  dosage: string;
  frequency: string;
  duration: number | "";
  route: string;
  type: string;
  instructions: string;
}

export interface ReportData {
  symptoms: string[];
  tests: string[];
  diagnosis: string;
  referral: string;
  notes: string;
  medicines: Medicine[];
}

export interface MedicineError {
  medicine?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  route?: string;
  type?: string;
  instructions?: string;
}

export interface ReportErrors {
  symptoms?: string;
  tests?: string;
  diagnosis?: string;
  referral?: string;
  notes?: string;

  medicines?: MedicineError[];
}

export const validateReport=(

data:ReportData

):ReportErrors=>{

const errors:ReportErrors={};

if(data.symptoms.length===0){
    errors.symptoms="Select at least one symptom";
}

if(data.tests.length===0){
    errors.tests="Select at least one test";
}

if(!data.diagnosis.trim()){
    errors.diagnosis="Diagnosis is required";
}

if(!data.referral.trim()){
    errors.referral="Referral is required";
}

if(!data.notes.trim()){
    errors.notes="Notes are required";
}

const medicineErrors:MedicineError[]=[];

data.medicines.forEach((m)=>{

const error:MedicineError={};

if(!m.medicine.trim())
error.medicine="Medicine name required";

if(!m.dosage.trim())
error.dosage="Dosage required";

if(!m.frequency)
error.frequency="Frequency required";

if(m.duration==="" || Number(m.duration)<=0)
error.duration="Duration required";

if(!m.route)
error.route="Route required";

if(!m.type)
error.type="Type required";

if(!m.instructions.trim())
error.instructions="Instructions required";

medicineErrors.push(error);

});

if(medicineErrors.some(item=>Object.keys(item).length>0)){
errors.medicines=medicineErrors;
}

return errors;

}