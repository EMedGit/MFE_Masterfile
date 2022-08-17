export class Laboratory {
    id: number;
    createdBy: string;
    createdDateTime: string;
    modifiedBy: string;
    modifiedDateTime: string;
    status: boolean;
    code: string;
    description: string;
    price: number;
    highestPrice: number;
    lowestPrice: number;
    priceReferenceIndex: number;
    diagnosisRemarks: string;
    departmentCode: string;
    specializationCode: string;
    activeInactiveStatus: boolean;
    ancillarySpecializationId: number;
    ancillaryDepartmentId: number;
    classificationId: number;
    forPHIC: boolean;
}