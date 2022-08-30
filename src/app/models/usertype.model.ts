export class UserType {
    id : number;
    code : string;
    description : string;
    status : boolean;
    createdBy:string;
    createdDateTime: Date;
    modifiedBy: string;
    modifiedDateTime: Date | null;
}