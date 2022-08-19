export class Radiology {
    id: number;
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
    ancillarySectionId: number;
    ancillaryDepartmentId: number;
    classificationId: number;
    forPHIC: boolean;
    createdBy: string;
    createdDateTime: string;
    modifiedBy: string;
    modifiedDateTime: string;
    status: boolean;
}