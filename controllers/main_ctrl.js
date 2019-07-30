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

                data = {
                    levels: result
                }

                response.render('index',data);
            }else{
                console.log('done')
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
  };

}