import React, {Component} from "react";
import jwtDecode from "jwt-decode";
import * as firebase  from 'firebase';

import "./App.css";

class User {
    name;
    fullName;

    constructor(name, fullName) {
        this.name = name;
        this.fullName = fullName;
    }
}

class App extends Component {
    currentUser;
    text;

    componentWillMount = () => {
        const token = this.props.match.params.token;
        try {
            const decode = jwtDecode(token);
            this.currentUser = new User(decode.name, decode.fullName);
        } catch (err) {
        }

        var config = {
            apiKey: "AIzaSyB9dC3YeKiD8EbC7cPSPbkPzEEfFF4EwB8",
            authDomain: "matrixx-4ebd8.firebaseapp.com",
            databaseURL: "https://matrixx-4ebd8.firebaseio.com",
        };
        firebase.initializeApp(config);
    };

    onClick = () => {
        firebase.auth().signInWithEmailAndPassword('matrixx@matrix.com', 'bT34wfe3FewafG').then(() => {
            this.writeUserData(this.currentUser.fullName, "text");
        }).catch(function (error) {
            console.log(error)
        });
    };

    writeUserData = (fullName, text) =>  {
        const data = {};
        data[fullName] = text;
        firebase.database().ref('users').set(data);
    };

    render() {

        return (
            <div className="App">
                <h1>Wake up {this.currentUser.name}!</h1>
                <h2>The Matrix has you…</h2>
                <h2>Free your mind on the 1st of April, Suvorov st. 92, at 6 P.M.</h2>

                <h2>But now, write here smth about yourself that nobody </h2>
                <h2>knows____________</h2>
                <h2>It will help you</h2>

                <textarea value={this.text}></textarea>
                <button onClick={this.onClick}>OK</button>
            </div>
        );
    }

}

export default App;
