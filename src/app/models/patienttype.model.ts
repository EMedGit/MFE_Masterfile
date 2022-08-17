export class PatientType{
    id:number;
    healthFacilityId?:number;
    healthFacilityName?:string;
    healthFacilityCode?:string;
    description:string;
    createdBy:string;
    createdDateTime: string;
    modifiedBy: string;
    modifiedDateTime: string;
    status:boolean;
}