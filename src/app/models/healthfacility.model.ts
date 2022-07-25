
<<<<<<< HEAD
export class HealthFacility {
    id:number;
=======
import { Department } from "./department.model";
import { Section } from "./section.model";

export interface HealthFacility {
    id?:number;
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
    name? : string;
    code? : string;
    facilityaddress? : string;
    status? : boolean;

<<<<<<< HEAD
=======
    departments? : Department [];
    sections? : Section [];
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42



}
