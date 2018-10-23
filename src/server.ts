import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {ngExpressEngine} from '@nguniversal/express-engine';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import jszip from 'jszip';
import * as bigint from 'big-integer';
import * as domino from 'domino';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';

const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(process.cwd(), 'dist');

const template = fs.readFileSync(path.join(process.cwd(), 'dist', 'html', 'index.html')).toString();
global['window'] = domino.createWindow(template);
global['window']['JSZip'] = jszip;
global['window']['BigInt'] = bigint;

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(path.join(process.cwd(), 'dist', 'server', 'main'));

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', path.join(DIST_FOLDER, 'html'));

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Server static files from /html
app.get('*.*', express.static(path.join(DIST_FOLDER, 'html'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
