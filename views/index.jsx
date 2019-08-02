var React = require('react');
var Default = require('./layout/default');

class Index extends React.Component {
  render() {
    return (
      <Default title="air_levels">
        <div className="container">
            <div className="col">
                <div className="login_wrapper d-flex flex-column">
                    <h1 className="title">Login</h1>

                    <form action="/check" method="POST" >
                        <p>user name</p>
                            <input type="text" name="username" />
                        <p>password</p>
                            <input type="text" name="password" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
      </Default>
    );
  }
}

module.exports = Index;