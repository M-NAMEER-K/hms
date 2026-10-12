export interface AppointmentFormData {
    doctorId: number | null;
    appointmentTime: string;
    reason: string;
    notes: string;
}

export interface AppointmentErrors {
    doctorId?: string;
    appointmentTime?: string;
    reason?: string;
    notes?: string;
}

export const validateAppointment = (
    data: AppointmentFormData
): AppointmentErrors => {

    const errors: AppointmentErrors = {};

    if (!data.doctorId) {
        errors.doctorId = "Please select a doctor";
    }

    if (!data.appointmentTime) {
        errors.appointmentTime = "Appointment time is required";
    } else {
        const selected = new Date(data.appointmentTime);
        const now = new Date();

        if (selected <= now) {
            errors.appointmentTime =
                "Appointment time must be in the future";
        }
    }

    if (!data.reason.trim()) {
        errors.reason = "Please select appointment reason";
    }

    if (data.notes.length > 300) {
        errors.notes =
            "Additional notes cannot exceed 300 characters";
    }

    return errors;
};