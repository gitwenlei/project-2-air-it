let myData = sensorLevels.split(",");
let sensor = myData.map(level => {
    return parseInt(level)
});
// console.log(sensor);

let myLabels = timeDate.split(",");
let sensorTime = myLabels.map(myTime => {
    return Date.parse(myTime)
});
// console.log(sensorTime);


var data = sensor;
var labels = myLabels;

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
                label: 'Air Quality Index',
                data: data,
                borderColor: "#3cba9f",
                backgroundColor: 'rgba(0, 119, 204, 0.5)'
            }]
          },
    options: {
        scales:{
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    }
});