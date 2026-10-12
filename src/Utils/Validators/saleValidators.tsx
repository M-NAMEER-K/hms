export interface SaleErrors {
    buyerName?: string;
    buyerContact?: string;
}

export interface SaleData {
    buyerName: string;
    buyerContact: string;
}

export const validateSale = (data: SaleData): SaleErrors => {

    const errors: SaleErrors = {};

    if (!data.buyerName.trim()) {
        errors.buyerName = "Buyer name is required.";
    }

    if (!data.buyerContact.trim()) {
        errors.buyerContact = "Buyer contact is required.";
    } else if (!/^[6-9]\d{9}$/.test(data.buyerContact)) {
        errors.buyerContact = "Enter a valid 10-digit mobile number.";
    }

    return errors;
};