export class Discounts {
    id:number;
    patientTypeId?:number;
    patientTypeDescription?:string;
    discountschemaPharmacy : string;
    discountschemaLaboratory : string;
    discountschemaRadiology : string;
    discountPharmacy : string;
    discountLaboratory : string;
    discountRadiology : string;
    createdBy:string;
    createdDateTime: string;
    modifiedBy: string;
    modifiedDateTime: string;
    status:boolean;
}