
console.log("starting up!!");
const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const pool = new pg.Pool(configs);

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

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});



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
    const queryString = `SELECT * FROM Levels`;

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