var React = require('react');

class Default extends React.Component {
    render() {
    return (
        <html>
            <head>
            <title>Air It</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/css/style.css"/>
            </head>
            <body>{this.props.children}</body>
        </html>
        );
    }
}

module.exports = Default;