var React = require('react');
var Default = require('./layout/default');

class Home extends React.Component {
  render() {

    let now = this.props.levels[0].recorded_at;
    let hours = now.getHours();
    let min = now.getMinutes();
    let year = now.getFullYear();
    let mth = now.getMonth() + 1;
    let date = now.getDate();
    let dateTime  = `${year}-${mth}-${date} ${hours}:${min}`;

    const levelList = this.props.levels.map(level =>
        <div key={level.sensor_level} className="sensor_reading">
            <div className="sensor_level"><h1>{level.sensor_level}</h1></div>
            <p className="status">{level.status}</p>
            <p className="description">{level.description}</p>
            <p className="recorded_at">Recorded On: {dateTime}</p>
        </div>
        );
    return (
      <Default title="air_levels">
        <div className="container">
            <div className="row">
                <div className="sensor_wrapper col d-flex flex-column text-center">
                <h1 className="title">Porpor's air</h1>
                  {levelList}
                </div>
            </div>
        </div>
      </Default>
    );
  }
}

module.exports = Home;