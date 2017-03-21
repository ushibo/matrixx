import React, {Component} from "react";
import "./App.css";

class App extends Component {
    onClick = () => {
        console.log("this", this);

    };

    render() {
        return (
            <div className="App">
                <div>
                    <h2>{this.props.match.params.token}</h2>
                </div>

                <h1>Matrix</h1>
                <input type="text"></input>
                <button onClick={this.onClick}>OK</button>
            </div>
        );
    }

}

export default App;
