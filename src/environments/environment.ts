// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  base_url: "https://snserviceapi.azurewebsites.net/", 
  homelink: "https://sgbelectiondev.azurewebsites.net",
  doc_upload: "https://sgbserviceapi-dev.azurewebsites.net/api/Upload/Document"
};

//base_url: "https://localhost:5001/", https://snserviceapi.azurewebsites.net/, https://schoolnutritionapi-dev.azurewebsites.net/
//base_url: "https://sgbelectionapi-dev.azurewebsites.net/"

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
//  base_url: "https://sgbserviceapi-dev.azurewebsites.net/"
//  base_url: "https://sgbelectionapi-qa.azurewebsites.net/"