var React = require('react');
var Default = require('./layout/default');

class UserProfile extends React.Component {
  render() {
    var url = "/profile/" + this.props.levels.user_id;
    var formAction = url + "?_method=PUT";
    console.log('formAction: ', formAction);

    console.log("home navbar user id:", this.props.levels.user_id);
    console.log("username browser:", this.props.levels.username);
    console.log(typeof this.props.levels.user_id);
    var userHomeUrl = "/home/" + this.props.levels.user_id;
    var userChartUrl = "/chart/" + this.props.levels.user_id;
    var userProfileUrl = "/profile/" + this.props.levels.user_id;

    return (
      <Default title="air_levels">

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href={userHomeUrl}>Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <a className="nav-item nav-link active" href={userChartUrl}>Hourly <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href={userProfileUrl}>My Profile</a>
            </div>
        </div>
    </nav>

        <div className="container">
            <div className="col">
                <div className="login_wrapper d-flex flex-column">
                    <h1 className="title">Your Profile</h1>
                    <form action={formAction} method="POST" >
                        <h3>user id</h3>
                            <input type="text" name="user_id" value={this.props.levels.user_id} readonly="readonly" />
                            <br />
                            <br />
                        <h3>user name</h3>
                            <input type="text" name="username" value={this.props.levels.username} readonly="readonly" />
                            <br />
                            <br />
                        <h3>password</h3>
                            <input type="password" name="password" defaultValue={this.props.levels.password} />
                            <br />
                            <br />
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

module.exports = UserProfile;