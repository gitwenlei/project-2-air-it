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
    var userProfileUrl = "/profile/" + this.props.userId;

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
                    <a className="nav-item nav-link" href={userProfileUrl}>My Profile</a>
                </div>
            </div>
        </nav>

        <div className="container">
            <div className="row">
                <div className="sensor_wrapper col d-flex flex-column text-center">
                <h1 className="title">Hello: {this.props.userName}</h1>
                <h1 className="title">Location: {levels.location_name}</h1>
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

                   <div className="air-index">
                    <p>0 to 50 air fresh - good air condition</p>
                    <p>0 to 200 low pollution - low concentration of target gases exist</p>
                    <p>200 to 400 high pollution - be aware of the pollution level and consider if some measures could be taken</p>
                    <p>400 to 600 very high pollution - instant measures should be taken to improve the air quality</p>
                </div>


                </div>
            </div>
        </div>

      </Default>
    );
  }
}

module.exports = UserPage;