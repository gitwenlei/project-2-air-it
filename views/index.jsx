var React = require('react');
var Default = require('./layout/default');

class Index extends React.Component {
  render() {
    return (
      <Default title="air_levels">
        <div className="container">
            <div className="col">
                <div className="login_wrapper d-flex flex-column">
                    <h1>Air It </h1>
                    <img className="cover-img" src="./images/air_s.png" />
                    <h1 className="title">Login</h1>
                    <form action="/check" method="POST" >
                        <p>user name</p>
                        <input type="text" name="username" />
                        <p>password</p>
                        <input type="text" name="password" />
                        <br />
                        <br />
                        <input type="submit" value="Submit" />
                        <p className="register-link">New User? Create a new account <a href="/register">here.</a></p>
                    </form>
                </div>
            </div>
        </div>
      </Default>
    );
  }
}

module.exports = Index;