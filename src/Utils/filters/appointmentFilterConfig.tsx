export const appointmentFilterConfig = [
    {
        name:"status",
        label:"Status",
        type:"select",
        options:[
            {label:"Scheduled",value:"SCHEDULED"},
            {label:"Completed",value:"COMPLETED"},
            {label:"Cancelled",value:"CANCELLED"}
        ]
    },
  {
        name: "fromDate",
        label: "From",
        type: "date"
    },

    {
        name: "toDate",
        label: "To",
        type: "date"
    },

    {
        name:"sortBy",
        label:"Sort By",
        type:"select",
        options:[
            {label:"Appointment Time",value:"appointmentTime"},
            {label:"Status",value:"status"}
        ]
    },

    {
        name:"sortDirection",
        label:"Direction",
        type:"select",
        options:[
            {label:"Newest",value:"DESC"},
            {label:"Oldest",value:"ASC"}
        ]
    }
];