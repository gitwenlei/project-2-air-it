console.log("we are in the browser");

var button = document.querySelector("#air-con");
var checked;
var activationState;
var btnTxt = 'AIR-CON';


// what to do when we recieve the request
var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);

  // if (this.status === 200) {
  //   if (airConState === false ) {
  //       airConState = true;
  //   } else {
  //       airConState = airConState;
  //   }
  //   return airConState;
  // }
  // let response = JSON.parse(this.responseText);
  // console.log(response);
};


//====================================
// START REQUEST
//====================================

var submitRequest = function() {
    // console.log("clicked!")


    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    var url = "/";
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); //impt to incld to send request to browser

    if (checked != true) {
        checked = true;
        activationState = true;
        alert ("button checked");
    } else {
        // this mean checked = true
        // therefore set checked = false
        checked = false;
        activationState = false;
        alert ("button unchecked");
    }

    console.log("activation: ", activationState);

    var data = {
        state: 'Air Con On',
        activation: activationState
    }

    // send the request
    request.send(JSON.stringify(data)); // convert object to string. request can only send string type
    // console.log("sent!:", JSON.stringify(data));
};


window.onload = () => {
    console.log("loaded!");
    button.addEventListener("click", function() {
        submitRequest();
        let btn = document.querySelector("#air-con");
        if (activationState) {
            btn.innerText = btnTxt + ' ON';
            btn.style.backgroundColor = '#3579f6';
        } else {
            btn.innerText = btnTxt + ' OFF';
            btn.style.backgroundColor = '#B3B3B3';
        }

    });
}