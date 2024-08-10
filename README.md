# OFAC Screening

### Description
This web app shows a form that receives the following input: name, birth year and country. Upon submission, it will query the [OFAC API](https://docs.ofac-api.com/screening-api)'s Sanctions Screening endpoint to check if therer is a match report in the OFAC data source.

If a person has any of the three fields match against the SDN list, a dialog will be shown with "Hit" as its title and the exact input that is matched.

If a person is not matched, a dialog will be shown with "Clear" as its title. At this point, the user will be redirected to [Google](https://google.com) regardless of whether they click the Continue button on the dialog or dismiss the dialog, because there is no need to screen this user again.

All of these three inputs are mandatory and the API query will not happen if any of the input is empty or invalid. E.g. the birth year should be no earlier than 1900 and no later than the current year. An error message will be shown under the corresponding text field if that input is invalid.

Country should be selected from a list of available countries when the country input field is clicked. Users are not be able to type in this field.

Due to limitations in the [OFAC API](https://docs.ofac-api.com/screening-api), the birth year must be converted to date of birth so this web app just appends Jan 01 to the birth year.

### Deployment
Make sure the Node.js version is >= 14.

Create `.env` at the project root folder and add the following environment variable for the API key:
`REACT_APP_OFAC_API_KEY`

Run
```
npm install
npm run build
npm install -g serve
serve -s build
```

It will then show you the URL to access the web page.

### Improvements
The layout is not thoroughly tested on different screen sizes due to time constraints. Further improvements can be made so that people using different devices can access the web page without issues.

This web app used `create-react-app` and not `next.js` due to the [material-web](https://github.com/material-components/material-web/tree/main) library does not work on the latter framework. It may be better to use `next.js` or `Vite` + `React`.

Inputs should be sanitized before sending them to the API call. E.g. when users change the country to a random string in the browser console, the web app should check if it really is a valid country before making the API request.

Previous input should be saved as cache to prevent users using the same input to query the API over and over again and waste API usages.

The API request body contains several fields that can be fed country data. E.g. citizenship, nationality, and country in the address object. The API response contains a `matchFields` JSON array that indicates the matched properties. I am not able to find a matched property other than `name`, so I assumed the `fieldName` in the match object is just the name of the corresponding property in the API request body. Also, the API documentation did not specify the format of these fields, so should we pass the country name, or the short ISO code?

The country selector menu directly gets all the country names in a JSON file. Maybe this can be optimized in the future.

Right now the main form may increase in height when the submit button is clicked and the progress bar is shown, or any of the input field shows an error. This is not fixed at the moment due to time constraints.
