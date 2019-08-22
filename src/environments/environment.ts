// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  googleAnalyticsId: 'UA-XXXXXX-YY',
  /* api used with json-server
  apiUrl:'http://localhost:3000/',*/
  //apiUrl: 'http://localhost:4000/assets/fixtures',
  coursesJsonVersion: 'v1.3',
  apiUrl: 'assets/fixtures', //this relative URL causes error on angular universal. Use full URL instead
  wordpressUrl: 'https://blog.enriqueoriol.com/wp-json/wp/v2',
  wordpressCustomUrl: 'https://blog.enriqueoriol.com/wp-json/custom/v1',
  mailchimpUrl: 'https://enriqueoriol.us12.list-manage.com',
  contactUrl: 'https://blog.enriqueoriol.com/wp-json/contact-form-7/v1/contact-forms/1474/feedback'
};
