var React = require('react');
var Navbar = require('../components/navbar');

class Default extends React.Component {
    render() {
    return (
        <html>
            <head>
            <title>Air It</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/css/style.css"/>
            </head>
            <body>
            <Navbar title="nav-bar" />
            {this.props.children}
            <script src="/script.js"></script>
            </body>

        </html>
        );
    }
}

module.exports = Default;