var React = require('react');

class Navbar extends React.Component {
    render() {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#">24 Hr <span className="sr-only">(current)</span></a>
          <a className="nav-item nav-link" href="#">1 Week</a>
          <a className="nav-item nav-link" href="#">1 Month</a>
        </div>
      </div>
    </nav>
        );
    }
}

module.exports = Navbar;