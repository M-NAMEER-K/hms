export interface RegisterFormData {
    name:string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "PATIENT" | "DOCTOR" | "ADMIN";
}

export interface RegisterErrors {
    name?:string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
}

export const validateRegister = (data: RegisterFormData): RegisterErrors => {

    const errors: RegisterErrors = {};

    if(!data.name.trim()){
        errors.name="Name is required";
    }

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Enter a valid email";
    }

   const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W]).{8,15}$/;

if (!data.password) {
    errors.password = "Password is required";
} else if (!passwordRegex.test(data.password)) {
    errors.password =
        "Password must contain an uppercase, lowercase, digit, special character, and be 8-15 characters long.";
}

    if (!data.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    if (!data.role) {
        errors.role = "Please select a role";
    }

    return errors;
};


// ---------------- LOGIN ----------------

export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginErrors {
    email?: string;
    password?: string;
}

export const validateLogin = (
    data: LoginFormData
): LoginErrors => {

    const errors: LoginErrors = {};

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Enter a valid email";
    }
    
    
     const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W]).{8,15}$/;

if (!data.password) {
    errors.password = "Password is required";
} else if (!passwordRegex.test(data.password)) {
    errors.password =
        "Password must contain an uppercase, lowercase, digit, special character, and be 8-15 characters long.";
}

    return errors;
};



// ---------------- FORGOT PASSWORD ----------------

export interface ForgotPasswordData {
    email: string;
}

export interface ForgotPasswordErrors {
    email?: string;
}


export const validateForgotPassword = (
    data: ForgotPasswordData
): ForgotPasswordErrors => {

    const errors: ForgotPasswordErrors = {};

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Enter a valid email";
    }

    return errors;
};




// ---------------- RESET PASSWORD ----------------


export interface ResetPasswordData {
    password:string;
}


export interface ResetPasswordErrors {
    password?:string;
}


export const validateResetPassword = (
    data:ResetPasswordData
):ResetPasswordErrors=>{


    const errors:ResetPasswordErrors={};


    const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W]).{8,15}$/;


    if(!data.password.trim()){
        errors.password="Password is required";
    }
    else if(!passwordRegex.test(data.password)){
        errors.password=
        "Password must contain uppercase, lowercase, digit, special character and be 8-15 characters long.";
    }


    return errors;

};




// ---------------- VERIFY OTP ----------------


export interface VerifyOtpData {
    email:string;
    otp:string;
}


export interface VerifyOtpErrors{
    email?:string;
    otp?:string;
}


export const validateVerifyOtp = (
    data:VerifyOtpData
):VerifyOtpErrors=>{


    const errors:VerifyOtpErrors={};


    if(!data.email.trim()){
        errors.email="Email is required";
    }


    if(!data.otp.trim()){
        errors.otp="OTP is required";
    }
    else if(!/^\d{6}$/.test(data.otp)){
        errors.otp="OTP must be 6 digits";
    }


    return errors;

};