var React = require('react');
var Default = require('./layout/default');

class UserAdded extends React.Component {
  render() {
    return (
      <Default title="Air It">
        <div className="container">
            <div className="col">
                <div className="login_wrapper d-flex flex-column">
                    <h1 className="title">Your new account is created~!</h1>
                    <h3><a href="/">login here</a></h3>
                </div>
            </div>
        </div>
      </Default>
    );
  }
}

module.exports = UserAdded;