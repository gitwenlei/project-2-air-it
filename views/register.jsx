var React = require('react');
var Default = require('./layout/default');

class RegisterPage extends React.Component {
  render() {
    return (
      <Default title="Air It">
        <div className="container">
            <div className="col">
                <div className="login_wrapper d-flex flex-column">
                    <p className="display-title">Create New Account</p>

                    <form action="/register" method="POST" >
                        <p>user name</p>
                            <input type="text" name="username" />
                        <p>password</p>
                            <input type="text" name="password" />
                        <p>locations subscription</p>
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