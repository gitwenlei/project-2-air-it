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
        }else{
            if (result) {
                var data = {
                    levels: result
                }
                response.render('index',data);
            }else{
                console.log('done')
            }
        }
    })
  };


  let airConOn = (request, response) => {
    // console.log("body:", request.body);
    db.main.setRoomState(request.body, (error,result)=>{
        if(error){
            console.log(error)
        } else {
            if (result) {
                response.send('room state updated!')
            }
        }
    })
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