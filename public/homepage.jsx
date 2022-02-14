const React = require('react');
// const fetch = require('node-fetch');
// import fetch from 'node-fetch'
const { fetch } = require('node-fetch');


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:3000/api/queries/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    componentWillMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="shopping-list">
                <h1>Lista de compras para {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
                {/* <script src="js/boton.js"></script> */}
            </div>

        )
    }
}

module.exports = App;