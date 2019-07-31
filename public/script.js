console.log("we are in the browser");

var button = document.querySelector("#air-con");

// what to do when we recieve the request
var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);

  // let response = JSON.parse(this.responseText);
  // console.log(response);
};


//====================================
// START REQUEST
//====================================

var submitRequest = function() {
    console.log("clicked!")
    // make a new request
    var request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url

    var url = "/";
    request.open("POST", url);
    // request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    let now = new Date();

    var data = {
        state: 'Air Con On',
        activated_at: now,
        activation: true
    }

    // console.log("data:", data);
    // send the request
    request.send(JSON.stringify(data)); // convert object to string. request can only send string type
    console.log("sent!");
    // console.log("data:", JSON.stringify(data));
    // request.send(data);
};


window.onload = () => {
    console.log("loaded!");
    button.addEventListener("click", submitRequest);
}