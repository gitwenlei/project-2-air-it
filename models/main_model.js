/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // ========================
    // Check user login details
    // ========================
    let checkUsers = (main, callback) => {  // called in ctrlr file
        // const password = sha256(tweedr.password);
        // main is the request.body in controller

        const password = main.password;
        let query = `SELECT * FROM users WHERE username=$1`;
        const values = [main.username];
        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error){
                // wrong username & pwd entered show "cannot load"
                console.log("#########cannot load###########")
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0 ) {
                    if (queryResult.rows[0].password === password) {
                        console.log("********correct password*********");
                        //if correct, send back this row to ctrlr
                        callback(null, queryResult.rows);
                    } else {
                        // correct username wrong password
                        console.log("&&&&&&&&&&wrong password&&&&&&&&&&");
                        callback(null, null);
                    }
                } else {
                    // wrong username wrong password entered
                    // wrong username correct password
                    // or empty username & password
                    console.log("========no results found=======");
                    callback(null, null);
                }
            }
        });
    };






    // insert live data into database
    let insertAir = (content, callback) => {
        let query = `INSERT INTO air_levels_test (sensor_level, status, description) VALUES($1, $2, $3) RETURNING *`;
        const values = [content.sensor_level, content.status, content.description];

        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    };


    // `dbPoolInstance` is accessible within this function scope
    let getLatest = (callback) => {
        // select the latest entry
        let data = {
            air_levels: null,
            room_states: null
        };
        let query = `SELECT * FROM air_levels_test WHERE recorded_at= (SELECT MAX(recorded_at) FROM air_levels);`;
        dbPoolInstance.query(query, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    // callback(null, queryResult.rows);
                    data.air_levels = queryResult.rows;
                    query = `SELECT * FROM room_states WHERE state='Air Con On' AND (activated_at=(SELECT MAX(activated_at) FROM room_states));`;
                    dbPoolInstance.query(query, (error, queryResult) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            if (queryResult.rows.length > 0) {
                                data.room_states = queryResult.rows;
                                callback(null, data);
                            }
                            // else {
                            //     callback(null, null);
                            // }
                        }
                    });
                } else {
                    callback(null, null);
                }
            }
        });
    };



    let plotData = (callback) => {
        const query = `SELECT * FROM air_levels_test WHERE location_id=1`;
        dbPoolInstance.query(query, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    };




    let setRoomState = (content, callback) => {
        // console.log('content', content);
        const query = `INSERT INTO room_states (state, activation) VALUES($1, $2) RETURNING *`;

        let values = [content.state, content.activation];
        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    };


    return {
        checkUsers,
        getLatest,
        setRoomState,
        insertAir,
        plotData
    };
};