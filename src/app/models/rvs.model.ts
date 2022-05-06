export interface RVS {
    id?:string;
    category?: string;
    code?:string;
    description?:string;
    caseRateAmount?:number;
    hospitalFee?:number;
    professionalFee?:number;
    secondCaseRateAmount?:number;
    secondHospitalFee?:number;
    secondProfessionalFee?:number;
    specialProcedure?:boolean;
    procedureType?:number;
    noOfDays?:number;
    status?:boolean;
}