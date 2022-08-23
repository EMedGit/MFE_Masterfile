export class ICD10 {
    id: number;
    code: string;
    description: string;
    caseRateAmount: number | null;
    hospitalFee: number | null;
    professionalFee: number | null;
    caseRateAmount2: number | null;
    hospitalFee2: number | null;
    professionalFee2: number | null;
    allowSingleConfinement: boolean | null;
    noOfDays: number | null;
    createdBy: string;
    createdDateTime: Date;
    modifiedBy: string;
    modifiedDateTime: Date | null;
    status: boolean;
}