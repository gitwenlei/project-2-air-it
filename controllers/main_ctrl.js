module.exports = (db) => {

const request = require('request');

// var url = 'https://us.wio.seeed.io/v1/node/GroveAirqualityA0/quality?access_token=c45d8f54443bc168ae329bcb2e090a2c';

var gaUrl = 'https://us.wio.seeed.io/v1/node/GroveAirqualityA0/quality?access_token=fc5e2bde1dcc2360fc3b44be538dd639'

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

   // ==========================================
    // Show LANDING page (it is also LOGIN page)
    // ==========================================
    let indexPage = (request, response) => { // function declared in routes.js
        response.render('index'); //display login form
    };



    // =======================================
    // GET Registration FORM
    // ========================================
    let registerPage = (request, response) => {
        response.render('register'); //display registration form
    };



    // =======================================
    // POST Register New Account
    // ========================================
    let registerNewUser = (request, response) => {

        var ga = parseInt(request.body.gaCheckbox);
        var home = parseInt(request.body.homeCheckbox);

        var location_id = [];
            if (ga !== undefined && home === undefined) {
                location_id = [ga, null];
            } else if (ga === undefined && home !== undefined) {
                location_id = [null, ga];
            } else if (ga !== undefined && home !== undefined) {
                location_id = [ga, home] ;
            }

        db.main.newUser(request.body, location_id, (error, results) => {
             if(error){
                console.log(error)
            } else {
                response.send('new account created~!')
            }
        });
    };


    // =======================================
    // Check user LOGIN details
    // ========================================
    /*
    * how to check login
    * user enter name in user name field
    * user enter password in password field
    * when user clicks on submit -> it will do a POST request to ctrl /check path
    * in ctrlr checkLogin - there is a request & response.
    * request = IncomingMessage = returns what the user entered in the input fields
    * body: { username: 'sdsds', password: 'sdsds' },
    * response = serverResponse returns: body: { username: '22222', password: '22222' },
    * request.body is passed into model to check against database
    */

    let checkLogin = (request, response) => { // function declared in routes.js
        // console.log("check login:", request);
        // console.log("check response: ", response);

        db.main.checkUsers(request.body, (error, results) => {
            // request.body = what  POST sent over
            // console.log(results);

            // if there is result sent back from model
            if (results !== null) {
                // console.log(results);
                // set the user_id to the results id
                let user_id = results[0].id;
                // this mean correct username and password entered
                console.log('correct' , results[0]);

                // sent cookied loggedin as true
                response.cookie('loggedin', true);

                // sent cookie user_id as user_id
                // we want to keep track that this user has login
                response.cookie('user_id', user_id);

                // go to user home page if login successful
                // if these cookies are stored, user will not see login page
                response.redirect('/home/' + user_id);
            } else {
                // other response incorrect password
                console.log("incorrect password");
                response.send('invalid input');
            }
        });
    };




    // ==============================================
    // Goto user HOME page based on login user id
    // ==============================================
    let userHomePage = (request, response) => {
        console.log("cookies:", request.cookies);
        const user_id = request.cookies.user_id;
        request.body.user_id = user_id;

        // this returns cookies: { loggedin: 'true', user_id: '1' }
        // meaning user_id: 1 is logged in

        if (request.cookies.loggedin === undefined) {
            console.log("Oops~ Not logged in");
            response.status(403);
            response.send("Oops~ Not logged in");
        } else {
            // how do I know if user is logged in?
            // if the cookies stored loogedin = true & user_id is not undefined
            // then it means user is logged in
            console.log("YAY~~~ Logged In!");
            // show most recent sensor reading
            console.log("CTRLR USER ID: ", user_id);

            db.main.getUserLatest(user_id, (error,result) => {
                if(error){
                    console.log(error)
                } else {
                    // console.log(result);
                    if (result) {
                        var data = {
                            levels: result
                            // states: result.room_states
                        }
                        response.render('user-home', data);
                    }else{
                        response.send("DIE LIAO");
                    }
                }
            });
        }
    };




    // ==============================================
    // Goto user CHART page based on login user id
    // ==============================================
    let userChartPage = (request, response) => {
        console.log("cookies:", request.cookies);
        const user_id = request.cookies.user_id;
        request.body.user_id = user_id;
        console.log("UUUUUUUUUUUUuser id: ", user_id);

        if (request.cookies.loggedin === undefined) {
            console.log("Oops~ Not logged in");
            response.send("Oops~ Not logged in");
            response.status(403);
        } else {
            console.log("YAY~~~ Logged In!");
            db.main.plotUserData(user_id, (error,result) => {
                if(error){
                    console.log(error)
                } else {
                    if (result) {
                        // console.log(result);
                        var location = result[0].location_name;
                        console.log("location:", location);

                        var id = result[0].user_id;
                        console.log("XXXXXXXXXXXXXuser id:", id);

                        var sensorLevels = result.map(function(value) {
                           return value.sensor_level;
                        });

                        var timeStamp = result.map(function(value) {
                           return value.recorded_at;
                        });

                        // console.log('sensor:', sensorLevels);
                        // console.log('timeDate:', timeStamp);

                        var data = {
                            yValues: sensorLevels,
                            xValues: timeStamp,
                            userLocation: location,
                            userId: id
                        }
                        // console.log("sensorLevels: ", data.yValues);
                        // console.log("timeStamp: ", data.xValues);
                        response.render('user-chart', data);
                    }else{
                        response.send('chart not loading!');
                    }
                }
            });
        }
    };




    // ==================================================
    // Show USER PROFILE page based on logged in user_id
    // ==================================================
    let userProfilePage = (request, response) => {
        const user_id = request.cookies.user_id;
        request.body.user_id = user_id;
        if (request.cookies.loggedin === undefined) {
            console.log("Oops~ Not logged in");
            response.status(403);
            response.send("Oops~ Not logged in");
        } else {
            console.log("YAY~~~ Logged In!");
            // console.log("CTRLR USER ID: ", user_id);
            db.main.getUserProfile(user_id, (error,result) => {
                if(error){
                    console.log(error)
                } else {

                    if (result) {
                        var data = {
                            levels: result[0]
                        }
                        console.log('user profile: ', data.levels);
                        response.render('user-profile', data);
                    }else{
                        response.send("Oops again~~~");
                    }
                }
            });
        }
    };


    // ==================================================
    // Show USER PROFILE page based on logged in user_id
    // ==================================================

    let updateProfile = (request, response) => {
        console.log("request body:", request.body);
        const user_id = request.body.user_id;
        const username = request.body.username;
        const password = request.body.password;

        var ga = parseInt(request.body.gaCheckbox);
        var home = parseInt(request.body.homeCheckbox);

        var location_id = [];
            if (ga !== undefined && home === undefined) {
                location_id = [ga, null];
                console.log("show locations: ", location_id);
            } else if (ga === undefined && home !== undefined) {
                location_id = [home, null];
                console.log("show locations: ", location_id);
            } else if (ga !== undefined && home !== undefined) {
                location_id = [ga, home] ;
                console.log("show locations: ", location_id);
            }

        db.main.getAndUpdateProfile(request.body, location_id, (error, results) => {
            if (results !== null) {
                console.log("result:", results);
                // let user_id = results[0].id;
                // var data {
                //     userId: user_id,
                //     userName: username,
                //     passWord: password,
                //     locationId: location_id
                // }
                response.send("profile updated");
            } else {
                response.send("error");
            }
        });
    };




    // ==============================================
    // Retrieve sensor data from cloud server
    // ==============================================

    let sensorCloud = (req, res) => {
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

                // console.log('status:', status);
                // console.log('description:', description);

                var sensorObj = {
                    sensor_level: sensorValue,
                    status: status,
                    description: description
                };

                db.main.insertAir(sensorObj, (error,result) => {
                    if(error){
                        console.log(error)
                    } else {
                        res.send(sensorObj);
                    }
                });
            }
        });
    };


    // ==============================================
    // Check if air-con is on
    // ==============================================

    let airConOn = (request, response) => {
        // console.log("body: ", request.body);
        db.main.setRoomState(request.body, (error,result)=>{
            if(error){
                console.log(error)
            } else {
                response.send('room state updated!') // must send response to request in script.js to confirm received
            }
        });
    };




  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index: indexPage,
    registerForm: registerPage,
    register: registerNewUser,
    check: checkLogin,
    userHome: userHomePage,
    userChart: userChartPage,
    userProfile: userProfilePage,
    updateUserProfile: updateProfile,
    liveData: sensorCloud,
    intervene: airConOn
  };
}