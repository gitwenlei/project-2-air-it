const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const request = require('request');


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
// Init express app
const app = express();
// Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);



/**
 * ===================================
 * ===================================
 *                DB
 * ===================================
 * ===================================
 */

// db contains *ALL* of our models
const allModels = require('./db');

/**
 * ===================================
 * ===================================
 * Routes
 * ===================================
 * ===================================
 */

// get the thing that contains all the routes
const setRoutesFunction = require('./routes');

// call it and pass in the "app" so that we can set routes on it (also models)
setRoutesFunction(app, allModels);


//////////////////////////////////////////////
// Retrieve live data of sensor from server //
//////////////////////////////////////////////

var gaUrl = 'https://us.wio.seeed.io/v1/node/GroveAirqualityA0/quality?access_token=fc5e2bde1dcc2360fc3b44be538dd639';

let sensorCloud = () => {
        request(gaUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body); // convert incoming string to object
                // console.log(data);
                // console.log(typeof data)
                var sensorValue = data.quality;
                console.log('sensor:', sensorValue);

                function quality(ppm) {
                    if (ppm < 50) {
                        return "Fresh Air";
                    }
                    if (ppm < 200) {
                        return "Normal Indoor Air";
                    }
                    if (ppm < 400) {
                        return "Low Pollution";
                    }
                    if (ppm < 600) {
                        return "High Pollution - Action Recommended";
                    }
                    return "Very High Pollution - Take Action Immediately";
                };

                function action(ppm) {
                    if (ppm < 50) {
                        return "The air is awesome & clean!!";
                    }
                    if (ppm < 200) {
                        return "Air is good but do start monitoring";
                    }
                    if (ppm < 400) {
                        return "Ooooo... time to on air-purifier";
                    }
                    if (ppm < 600) {
                        return "Close all windows immediately! On air-purifier & air-con";
                    }
                    return "This is serious! Wear a mask! All you sure windows are closed, and air-purifier and air-con are turned on? ";
                };

                // show status & description based on air quality
                var status = quality(sensorValue);
                var description = action(sensorValue);

                console.log('status:', status);
                console.log('description:', description);

                var sensorObj = {
                    sensor_level: sensorValue,
                    status: status,
                    description: description
                };

                var doThing = (error,result) => {
                    console.log("returning air levels")
                    if(error){
                        console.log(error)
                    } else {
                        console.log(result);
                        // res.send(sensorObj);
                    }
                };

                allModels.main.insertAir(sensorObj, doThing);
            }
        });
};

// ====================================
// Only retrieve data at specific time
// ====================================
let updateEveryMin = 60000;
let updateEveryQuarterHour = 900000;
let updateEveryHalfHour = 1800000;

var reference = setInterval(sensorCloud, updateEveryQuarterHour);

//////////////////////////////////////////

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));



let onClose = function(){

    clearInterval(reference);

    server.close(() => {
    console.log('Process terminated')
    allModels.pool.end( () => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);