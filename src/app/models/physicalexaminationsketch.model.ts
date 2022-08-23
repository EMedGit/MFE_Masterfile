export class PhysicalExaminationSketch {
    id: number;
    picturePath: string;
    description: string;
    consultationId: number;
    healthFacilityId: number;
    departmentId: number;
    sectionId: number;
    createdBy: string;
    createdDateTime: Date;
    modifiedBy: string;
    modifiedDateTime: Date | null;
    status: boolean;
}