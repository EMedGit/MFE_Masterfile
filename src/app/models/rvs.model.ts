export class RVS {
    id: number;
    category: string;
    code: string;
    description: string;
    caseRateAmount: number | null;
    hospitalFee: number | null;
    professionalFee: number | null;
    caseRateAmount2: number | null;
    hospitalFee2: number | null;
    professionalFee2: number | null;
    specialProcedure: boolean;
    procedureType: string;
    allowSingleConfinement: boolean | null;
    noOfDays: number | null;
    createdBy: string;
    createdDateTime: Date;
    modifiedBy: string;
    modifiedDateTime: Date | null;
    status: boolean;
}
