export class Discounts {
    id:number;
    patientTypeId?:number;
    patientTypeDescription?:string;
    discountSchemaPharmacy : number ;
    discountSchemaLaboratory : number;
    discountSchemaRadiology : number;
    createdBy:string;
    createdDateTime: string;
    modifiedBy: string;
    modifiedDateTime: string;
    status:boolean;
}