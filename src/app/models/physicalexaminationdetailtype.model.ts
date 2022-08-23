export class PhysicalExaminationDetailType {
    id: number;
    physicalExaminationTypeId: number;
    code: string;
    description: string;
    createdBy: string;
    createdDateTime: Date;
    modifiedBy: string;
    modifiedDateTime: Date | null;
    status: boolean;
}