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
  app.get('/live', mainControllerCallbacks.liveData);
  app.get('/', mainControllerCallbacks.home);
  app.post('/', mainControllerCallbacks.intervene);
};