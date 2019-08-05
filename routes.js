module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR MAIN CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
    const mainControllerCallbacks = require('./controllers/main_ctrl')(allModels);


    // ===========================================
    // GET landing page (which is also login page)
    // ===========================================
    app.get('/', mainControllerCallbacks.index);


    // ========================
    // REGISTRATION STUFF
    // ========================
    // Register new user
    app.get('/register', mainControllerCallbacks.registerForm);
    app.post('/register', mainControllerCallbacks.register);


    // ========================
    // LOGIN STUFF
    // ========================
    // verify user login
    app.post('/check', mainControllerCallbacks.check);


    // ========================
    // SENSOR STUFF
    // ========================
    // show live sensor datat
    app.get('/live', mainControllerCallbacks.liveData);


    // ========================
    // USER PAGE
    // ========================
    // show most recent recorded sensor data
    app.get('/home/:id', mainControllerCallbacks.userHome);


    // ========================
    // CHART PAGE
    // ========================
    // show data chart of past 24 hrs dats
    app.get('/chart/:id', mainControllerCallbacks.userChart);


    // ========================
    // USER PROFILE PAGE
    // ========================
    // show user profile page
    app.get('/profile/:id', mainControllerCallbacks.userProfile);
    // update user profile
    app.put('/profile/:id', mainControllerCallbacks.updateUserProfile);


    // ========================
    // SET ROOM CONDITION
    // ========================
    // set room conditions
    app.post('/home', mainControllerCallbacks.intervene);



};