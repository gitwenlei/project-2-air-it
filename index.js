
console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'fishie',
  host: '127.0.0.1',
  database: 'airdb',
  port: 5432,
};

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// Add CSS file in a public folder
app.use(express.static(__dirname+'/public/'));

const pool = new pg.Pool(configs);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

let now = new Date();
console.log(now);
console.log(now[0]);

// =============================
// links to pages
// =============================
const home = 'home.jsx';

/**
 * ===================================
 * Routes
 * ===================================
 */

// GET Show All Sensor Readings
app.get('/', (request, response) => {
    const queryString = `SELECT * FROM air_levels`;
    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            let data = {
                levels: result.rows
            };
            response.render(home, data);
        }
    });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){
    console.log("closing");
    server.close(() => {
        console.log('Process terminated');
        pool.end( () => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);