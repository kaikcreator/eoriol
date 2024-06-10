# EoriolFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.

## Install dependencies

In order to install the exact dependencies, please run `npm ci` (as per npm clean install).
**Remember you need to use Node version 10**

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
2 - Deploy only the hosting: `firebase deploy --only hosting`
