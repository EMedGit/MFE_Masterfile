import { environment } from "src/environments/environment";
export class Media {
    // file: string;
    // filePath: string;
    // serverPath: string;
    file: string;
    appId: string;
    patientNo: string;
    filePath: string;
    fileType: string;
    constructor()
    {
        this.appId = environment.appId;
    }
}
