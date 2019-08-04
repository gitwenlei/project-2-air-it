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
    app.get('/home/:id', mainControllerCallbacks.userHome);

    // ========================
    // HOME PAGE
    // ========================
    // show most recent recorded sensor data
    // app.get('/home', mainControllerCallbacks.home);
    // set room conditions
    app.post('/home', mainControllerCallbacks.intervene);

    // ========================
    // CHART PAGE
    // ========================
    // show data chart of past 24 hrs dats
    app.get('/chart', mainControllerCallbacks.chart);


};