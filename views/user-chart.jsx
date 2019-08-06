var React = require('react');
var Default = require('./layout/default');

class UserChart extends React.Component {
  render() {

    console.log("CCCCCCCCCCchart navbar user id:", this.props.userId);
    var userHomeUrl = "/home/" + this.props.userId;
    var userChartUrl = "/chart/" + this.props.userId;
    var userProfileUrl = "/profile/" + this.props.userId;

    // console.log("sensor: ", this.props.yValues);
    console.log("time: ", this.props.xValues);
    console.log("type for time:", typeof this.props.xValues);
    // console.log("user id inside chart pg:", this.props.userId);
    // console.log('location:', this.props.userLocation);

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

        <div className="chart-container">
            <canvas id="myChart" width="1200" height="800"></canvas>
        </div>
        <script dangerouslySetInnerHTML={{
            __html:
            `var sensorLevels = '${this.props.yValues}';
            var timeDate = '${this.props.xValues}';
            console.log("HELLO");
            `
        }} ></script>
        <script src="/chart.js"></script>
    </Default>

    );
  }
}

module.exports = UserChart;