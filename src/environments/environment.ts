// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

 //masterfileAPI: 'https://masterfile-development.azurewebsites.net/api/v1',
//  authAPI: 'https://identity-development.azurewebsites.net/api/v1'
 authAPI: 'https://localhost:44368/api/v1'
  ,masterfileAPI: 'https://localhost:44370/api/v1'
  ,addressInformationAPI: 'https://localhost:44318/api/v1'
  ,mediaAPI: 'http://13.75.89.190:11198/api/v1'
  ,appId:'EHR-QA'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
