/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope
    let getLatest = (callback) => {
        // select the latest entry
        let data = {
            air_levels: null,
            room_states: null
        };
        let query = `SELECT * FROM air_levels WHERE recorded_at= (SELECT MAX(recorded_at) FROM air_levels);`;
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
        getLatest,
        setRoomState
    };
};