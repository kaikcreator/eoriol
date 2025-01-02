# EoriolFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.

## Install dependencies

* In order to install the exact dependencies, please run `npm ci` (as per npm clean install).
* **Using Node v16**
* You also need to install an old version of Angular CLI:
`npm install -g @angular/cli@8.3.29`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `npm run build:universal` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `npm run serve:universal` to actually try it out.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploy a new version of the website in firebase

1 - Select the project you want to use (g.e. `use eoriolfront-staging`)
2 - Deploy the hosting **and the functions** (otherwise the updated `dist` folder won't be available to the function): 
`firebase deploy --only functions,hosting`
