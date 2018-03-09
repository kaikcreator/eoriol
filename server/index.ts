// These are important and needed before anything else
import 'zone.js/dist/zone-node';
//import 'reflect-metadata';
 
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import * as compression from 'compression';
import { join } from 'path';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main.bundle');
 
// NgUniversalTools: Express Engine and moduleMap for lazy loading
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

//firebase server side rendering on cloud functions
import * as firebaseFunctions from 'firebase-functions';
 
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();
 
// Express server
const app = express();
//add compression middleware to all responses (GZIP)
app.use(compression());
const DISABLE_FIREBASE = process.env.DISABLE_FIREBASE || false;
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), DISABLE_FIREBASE ? 'dist' : './');
 
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
 
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));
 
// TODO: implement data requests securely
// app.get('/api/*', (req, res) => {
//   res.status(404).send('data requests are not supported');
// });
 
// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
 
// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=1200');
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), {req});
});


if(DISABLE_FIREBASE){
  // Start up the Node server if not using firebase cloud functions
  app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
  });
}

//server side rendering using frebase cloud functions
export let ssr = DISABLE_FIREBASE ? null : firebaseFunctions.https.onRequest(app);