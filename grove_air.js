// Modified from Johnny-five sample Intel Edison + Grove - Air quality sensor
// http://johnny-five.io/examples/grove-gas-tp401-edison/

var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {
    // led pin
    var led = new five.Led(13);

    // Plug the Air quality sensor
    // module into the Grove Shield's A0 jack
    var gas = new five.Sensor("A0");
    var startAt = Date.now();

    // Init gas sensor
    gas.on("change", function() {
        // According to this document:
        // https://software.intel.com/en-us/iot/hardware/sensors/grove-air-quality-sensor
        // The sensor needs 2-3 minutes for "warm up"
        if (isWarming()) {
            console.log("warming up");
            return;
        }

        var sensorValue = this.value;
        console.log('sensor value:' + this.value);

        // var ppm = toPPM(this.value);
        // console.log("ppm: " + ppm);

        // show msg based on sensor value
        var msg = quality(sensorValue);
        console.log(msg);

        if (sensorValue < 50) {
            // console.log("Danger!");
            // blink led if sensor value is more than 50
            led.strobe();
        }
    });


    // ==== Warm Up takes 30 secs =====
    function isWarming() {
        return (Date.now() - startAt) < 30000;
    }

    // Conversion not required with version 1.3 of Grove Air Quality Sensor
    // // ==== Convert readings to PPM =====
    // function toPPM(value) {
    //     // https://www.seeedstudio.com/wiki/images/e/eb/TP-401A_Indoor_Air_quality_gas_sensor.pdf
    //     return 25 * value / 1023;
    // }


    // ==== Translate sensor value to air quality status =====
    function quality(ppm) {
    // Adapted from:
    // http://iotdk.intel.com/docs/master/upm/classupm_1_1_t_p401.html
        if (ppm < 50) {
            return "Fresh Air";
        }
        if (ppm < 200) {
            return "Normal Indoor Air";
        }
        if (ppm < 400) {
            return "Low Pollution";
        }
        if (ppm < 600) {
            return "High Pollution - Action Recommended";
        }
        return "Very High Pollution - Take Action Immediately";
    }

}); // end of board on