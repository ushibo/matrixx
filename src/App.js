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
    textarea;
    currentUser = new User("John", "John Doe");

    componentWillMount = () => {
        const token = this.getParameterByName('t');
        console.log('t', token);
        try {
            const decode = jwtDecode(token);
            if (decode == null) {
                return;
            }
            console.log('decode', decode);
            this.currentUser = new User(decode.name, decode.fullName)
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
        firebase.auth().signInWithEmailAndPassword('test@test.com', '123456').then(() => {
            this.writeUserData(this.currentUser.fullName, this.textarea);
        }).catch(function (error) {
            console.log(error)
        });
    };

    writeUserData = (fullName, text) => {
        firebase.database().ref('users/' + fullName).set({
            text: text
        });
        this.data = "";
    };

    handleChange = (event) => {
        this.textarea = event.target.value;
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

                <textarea value={this.textarea} onChange={this.handleChange}/>
                <button onClick={this.onClick}>OK</button>
            </div>
        );
    }

    getParameterByName = (name, url) => {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

}

export default App;
