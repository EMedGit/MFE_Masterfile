// export class UserClaim {
//     type:string;
//     value: boolean;
// }

export class Claim {
    type: string;
    value: string;
    checkboxvalue:boolean;
}

export class UserClaim {
    userId: string;
    claims: Claim[];
}