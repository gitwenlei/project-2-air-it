module.exports = (db) => {

const request = require('request');

// var url = 'https://us.wio.seeed.io/v1/node/GroveAirqualityA0/quality?access_token=c45d8f54443bc168ae329bcb2e090a2c';

var gaUrl = 'https://us.wio.seeed.io/v1/node/GroveAirqualityA0/quality?access_token=fc5e2bde1dcc2360fc3b44be538dd639'

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

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

                console.log('status:', status);
                console.log('description:', description);

                // var sensorObj = {
                //     sensor_level: sensorValue,
                //     status: status,
                //     description: description
                // };

                // db.main.insertAir(sensorObj, (error,result) => {
                //     if(error){
                //         console.log(error)
                //     } else {
                //         res.send(sensorObj);
                //     }
                // });
            }
        });
    };


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
        });
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
    liveData: sensorCloud,
    home: homePage,
    intervene: airConOn
  };
}