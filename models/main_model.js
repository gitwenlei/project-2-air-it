/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {


    // ========================
    // CHECK user login details
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




    // ========================================================
    // INSERT live sensor data into database
    // ========================================================
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




    // ========================================================
    // GET latest sensor level based on user id & subscription
    // ========================================================
    let getUserLatest = (user_id, callback) => {
        let query = `SELECT
                        user_location.user_id,
                        air_levels_test.sensor_level,
                        air_levels_test.status,
                        air_levels_test.description,
                        air_levels_test.recorded_at,
                        locations.location_name
                    FROM air_levels_test
                        INNER JOIN user_location
                            ON (user_location.location_id = air_levels_test.location_id)
                        INNER JOIN locations
                            ON (locations.id = air_levels_test.location_id)
                    WHERE user_location.user_id = '${user_id}'
                    AND user_location.location_id = locations.id
                    ORDER BY air_levels_test.recorded_at
                    DESC`;

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




    // ===========================================================
    // GET data based on user id & subscription & plot user chart
    // ===========================================================
    let plotUserData = (user_id, callback) => {
        const query = `SELECT
                        user_location.user_id,
                        air_levels_test.sensor_level,
                        air_levels_test.status,
                        air_levels_test.description,
                        air_levels_test.recorded_at,
                        locations.location_name
                        FROM air_levels_test
                        INNER JOIN user_location
                            ON (user_location.location_id = air_levels_test.location_id)
                        INNER JOIN locations
                            ON (locations.id = air_levels_test.location_id)
                        WHERE user_location.user_id = '${user_id}'
                        AND user_location.location_id = locations.id
                        ORDER BY air_levels_test.recorded_at
                        ASC`;

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




    // ==============================================================
    // GET data based on logged in user to show user profile page
    // ==============================================================
    let getUserProfile = (user_id, callback) => {
        const query = `SELECT
                        user_location.user_id,
                        users.username,
                        users.password,
                        user_location.location_id,
                        locations.location_name
                        FROM users
                        INNER JOIN user_location
                            ON (user_location.user_id = users.id)
                        INNER JOIN locations
                            ON (locations.id = user_location.location_id)
                        WHERE users.id = '${user_id}'
                        AND user_location.location_id = locations.id`;

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


    // ========================
    // UPDATE user profile
    // ========================
    let getAndUpdateProfile = (main, callback) => {
        const password = main.password;
        const user_id = main.user_id;

        console.log("updated pwd:", password);
        console.log("updated user_id:", user_id);

        // let query = `UPDATE users
        //                 SET password = '${password}'
        //                 WHERE id = '${user_id}'`;

        // dbPoolInstance.query(query, (error, queryResult) => {
        //     if (error){
        //         callback(error, null);
        //     } else {
        //         if (queryResult.rows.length > 0 ) {
        //                 callback(null, queryResult.rows);
        //         } else {
        //             callback(null, null);
        //         }
        //     }
        // });
    };




    // ===========================================================
    // POST room state based on user click
    // ===========================================================
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
        getUserLatest,
        plotUserData,
        getUserProfile,
        getAndUpdateProfile,
        insertAir,
        setRoomState
    };
};