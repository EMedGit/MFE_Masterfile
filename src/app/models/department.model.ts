import { Section } from "./section.model";

export interface Department {
    id? : number;
    code? : string;
    description? : string;
    status? : boolean;

    //sections? : Section[];
}