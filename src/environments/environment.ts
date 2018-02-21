// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  /* api used with json-server
  apiUrl:'http://localhost:3000/',
  */
  apiUrl: 'assets/fixtures',
  wordpressUrl: 'https://blog.enriqueoriol.com/wp-json/wp/v2',
  mailchimpUrl: 'https://enriqueoriol.us12.list-manage.com',
};
