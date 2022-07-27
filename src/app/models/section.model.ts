export class Section {
    id : number;
    code : string;
    description : string;
    status : boolean;
    createdBy:string;
    createdDateTime: string;
    modifiedBy: string;
    modifiedDateTime: string;

    departmentID? : number;
}