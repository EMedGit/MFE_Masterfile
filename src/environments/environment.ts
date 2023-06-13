// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // authAPI: 'https://identity-development.azurewebsites.net/api/v1'
  // ,masterfileAPI: 'https://masterfile-development.azurewebsites.net/api/v1'
  // ,addressInformationAPI: 'https://address-mfe.azurewebsites.net/remoteAddressInformation.js'
  // ,mediaAPI: 'http://13.75.89.190:11198/api/v1'
  // ,appId:'EHR-QA'
  //LABXASIA
  masterfileAPI: 'https://labxasia-masterfile-live-api.azurewebsites.net/api/v1',
  authAPI: 'https://labxasia-identity-live-api.azurewebsites.net/api/v1',
  addressInformationAPI: 'https://psgcaddress-live-api.azurewebsites.net/api/v1',
  mediaAPI: 'http://13.75.89.190:11195/api/v1',
  appId:'EHR-LABXASIA'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
