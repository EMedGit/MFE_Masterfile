export class Department {
    id : number;
    code : string;
    description : string;
    healthFacilityId: number
    healthFacilityCode: string;
    status : boolean;
    createdBy:string;
    createdDateTime: Date;
    modifiedBy: string;
    modifiedDateTime: Date | null;

}