import { environment } from 'src/environments/environment';

let serverPath = environment.serverPath;

export class AppConstants {
    public static readonly serverPath: string = serverPath;
    /* API url constants. */
    // Fake API.

    /* App paths constants. */
    public static readonly homePath: string = 'home';

    /* Other stuffs. */
}