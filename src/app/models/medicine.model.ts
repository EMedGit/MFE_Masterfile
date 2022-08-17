export class Medicine {
    id: number;
    code: string;
    description: string;
    genericName: string;
    cost: number;
    price: number;
    drugPriceReferenceIndex: number;
    highestPrice: number;
    lowestPrice: number;
    departmentId: number;
    sectionId: number;
    activeInActiveStatus: boolean;
    categoryId: number;
    formCode: string;
    genericCode: string;
    packageCode: string;
    saltCode: string;
    strengthCode: string;
    unitCode: string;
    formDescription: string;
    genericDescription: string;
    packageDescription: string;
    saltDescription: string;
    strengthDescription: string;
    unitDescription: string;

    createdBy: string;
    createdDateTime: Date;
    modifiedBy: string;
    modifiedDateTime: Date | null;
    status: boolean;
}
