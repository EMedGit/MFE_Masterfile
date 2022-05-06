export interface ICD10 {
    id?:string;
    code?:string;
    description?:string;
    caseRateAmount?:number;
    hospitalFee?:number;
    professionalFee?:number;
    secondCaseRateAmount?:number;
    secondHospitalFee?:number;
    secondProfessionalFee?:number;
    allowSingleConfinement?:boolean;
    noOfDays?:number;
    status?:boolean;
}