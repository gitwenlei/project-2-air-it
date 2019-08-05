var React = require('react');
var Default = require('./layout/default');

class RegisterPage extends React.Component {
  render() {
    return (
      <Default title="Air It">
        <div className="container">
            <div className="col">
                <div className="login_wrapper d-flex flex-column">
                    <h1 className="title">Register New Account</h1>

                    <form action="/register" method="POST" >
                        <h3>user name</h3>
                            <input type="text" name="username" />
                        <h3>user name</h3>
                            <input type="text" name="password" />
                        <h3>locations subscription</h3>
                        <div className="form-check form-check-block">
                            <input className="form-check-input" type="checkbox" id="check-box-ga" value="1" name="gaCheckbox" />
                              <label className="form-check-label" for="check-box-ga">GA</label>
                        </div>
                        <div className="form-check form-check-block">
                            <input className="form-check-input" type="checkbox" id="check-box-home" value="2" name="homeCheckbox" />
                              <label className="form-check-label" for="check-box-home">HOME</label>
                        </div>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
      </Default>
    );
  }
}

module.exports = RegisterPage;