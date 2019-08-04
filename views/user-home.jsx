var React = require('react');
var Default = require('./layout/default');

class UserPage extends React.Component {
  render() {
    console.log("USER PAGE:" , this.props.levels[0]);

    let now = this.props.levels[0].recorded_at;
    let hours = now.getHours();
    let min = now.getMinutes();
    let year = now.getFullYear();
    let mth = now.getMonth() + 1;
    let date = now.getDate();
    let dateTime  = `${year}-${mth}-${date} ${hours}:${min}`;

    const levels = this.props.levels[0];

    console.log("home navbar user id:", this.props.levels[0].user_id);
    var userHomeUrl = "/home/" + this.props.levels[0].user_id;
    var userChartUrl = "/chart/" + this.props.levels[0].user_id;

    return (

      <Default title="air_levels">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href={userHomeUrl}>Home</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href={userChartUrl}>Hourly <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="#">Weekly</a>
                    <a className="nav-item nav-link" href="#">My Profile</a>
                </div>
            </div>
        </nav>

        <div className="container">
            <div className="row">
                <div className="sensor_wrapper col d-flex flex-column text-center">
                <h1 className="title">{levels.location_name}</h1>
                <div key={levels.sensor_level} className="sensor_reading">
                    <p className="recorded_at">Recorded On: {dateTime}</p>
                    <div className="sensor_level"><h1>{levels.sensor_level}</h1></div>
                    <p className="status">{levels.status}</p>
                    <p className="description">{levels.description}</p>
                </div>
                  <div className="btn-group">
                      <button type="button" id="air-con" className="btn-air-con">AIR-CON OFF</button>
                      <button type="button" id="air-pure" className="btn-air-pure">AIR PURIFIER OFF</button>
                  </div>
                </div>
            </div>
        </div>

      </Default>
    );
  }
}

module.exports = UserPage;