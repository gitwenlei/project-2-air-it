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


    return {
        getLatest,
    };
};