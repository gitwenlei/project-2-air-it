/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope
    let getLatest = (callback) => {
        // select the latest entry
        const query = `SELECT * FROM air_levels WHERE recorded_at= (SELECT MAX(recorded_at) FROM air_levels);`;
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
        const query = `INSERT INTO room_states (state, activated_at, activation) VALUES($1, $2, $3) RETURNING *`;
        let values = [content.state, content.activated_at, content.activation];
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