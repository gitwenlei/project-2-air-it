module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  let homePage = (request, response) => {
    db.main.getLatest((error,result)=>{
        if(error){
            console.log(error)
        } else {
            // console.log(result);
            if (result) {
                var data = {
                    levels: result.air_levels,
                    states: result.room_states
                }
                response.render('index', data);
            }else{
                // var data = {
                //     levels: result.air_levels,
                //     states: result.room_states
                // }
                // response.render('index', data);
                // console.log('done')
                response.send("DIE LIAO")
            }
        }
    })
  };


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
    home: homePage,
    intervene: airConOn
  };
}