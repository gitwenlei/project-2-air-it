// var myData = [39, 40, 39, 40, 41, 42, 42];
// var myLabels =  ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"];
// console.log('sensor:', sensorLevels);
// console.log('timing:', timeDate);

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
var labels = sensorTime;

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: myLabels,
        datasets: [{
                label: 'Air Quality Index',
                data: myData,
                borderColor: "#3cba9f",
                // fill: true,
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