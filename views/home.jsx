var React = require("react");

class Home extends React.Component {
  render() {
    console.log("date: ", this.props.levels[0].recorded_at.toString());
    const levelList = this.props.levels.map(level =>
        <div key={level.sensor_level} className="sensor_level">
            <p className="sensor_level">{level.sensor_level}</p>
            <p className="status">{level.status}</p>
            <p className="date">{level.recorded_at.toString()}</p>
        </div>
        );
    return (
      <html>
        <body>
        <div className="container">
            <div className="row">
                <div className="col">
                  <h1>Welcome!</h1>
                  {levelList}
                </div>
            </div>
        </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;