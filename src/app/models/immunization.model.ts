export class Immunization {
    id: number;
    code: string;
    description: string;
    immunizationTypeId: number;
    status: boolean;
    createdBy: string;
    createdDateTime: Date;
    modifiedBy: string;
    modifiedDateTime: Date | null;
    
}