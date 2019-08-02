var React = require('react');
var Default = require('./layout/default');

class Chart extends React.Component {
  render() {
    // console.log("xvalues: ", this.props.yValues);
  return (
    <Default title="air_levels">
        <div className="chart-container">
            <p>Air Quality Index</p>
            <p>Making life better</p>
            <canvas id="myChart" width="1600" height="900"></canvas>
        </div>
        <script dangerouslySetInnerHTML={{
            __html:
            `var sensorLevels = '${this.props.yValues}';
            var timeDate = '${this.props.xValues}';
            `
        }} />
        <script src="chart.js"></script>
    </Default>

    );
  }
}

module.exports = Chart;