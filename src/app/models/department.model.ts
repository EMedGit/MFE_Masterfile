import { Section } from "./section.model";

export interface Department {
    id? : number;
    code? : string;
    description? : string;
    status? : boolean;

<<<<<<< HEAD
    //sections? : Section[];
=======
    sections? : Section[];
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
}