
import { Department } from "./department.model";
import { Section } from "./section.model";

export interface HealthFacility {
    id?:number;
    name? : string;
    code? : string;
    facilityaddress? : string;
    status? : boolean;

    departments? : Department [];
    sections? : Section [];



}
