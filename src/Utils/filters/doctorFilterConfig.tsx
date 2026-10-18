import { specializationDepartments, specializations } from "../constants/DoctorProfile";

export const doctorFilterConfig = [
  {
    name: "departments",
    label: "Department",
    type: "select",
    options: [
      ...Array.from(new Set(Object.values(specializationDepartments)))
        .sort()
        .map((department) => ({
          label: department,
          value: department,
        })),
    ],
  },

  {
    name: "specializations",
    label: "Specialization",
    type: "select",
    options: specializations.map((specialization) => ({
      label: specialization,
      value: specialization,
    })),
  },

  {
    name: "sortBy",
    label: "Sort By",
    type: "select",
    options: [
     
      {
        label: "Department",
        value: "department",
      },
      {
        label: "Specialization",
        value: "specialization",
      },
    ],
  },

  {
    name: "sortDirection",
    label: "Direction",
    type: "select",
    options: [
      {
        label: "Ascending",
        value: "ASC",
      },
      {
        label: "Descending",
        value: "DESC",
      },
    ],
  },
];