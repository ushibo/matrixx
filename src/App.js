import React, {Component, PropTypes} from "react";
import * as firebase  from 'firebase';
import {connect} from "react-redux";
import {sendUserText, setCurrentUser, changeText} from "./actions/index";

import "./App.css";


class App extends Component {
  componentWillMount = () => {
    this.props.dispatch(setCurrentUser());

    const config = {
      apiKey: "AIzaSyB9dC3YeKiD8EbC7cPSPbkPzEEfFF4EwB8",
      authDomain: "matrixx-4ebd8.firebaseapp.com",
      databaseURL: "https://matrixx-4ebd8.firebaseio.com",
    };
    firebase.initializeApp(config);
  };

  isDisabled() {
    return this.props.text.length == 0 || this.props.isFetching;
  }

  handleChangeText = (event) => {
    this.props.dispatch(changeText(event.target.value));
  };

  onSend = () => {
    if (this.isDisabled()) {
      return;
    }
    this.props.dispatch(sendUserText(this.props.currentUser.fullName, this.props.text));
  };

  render() {
    if (this.props.currentUser == null) {
      return this.renderUnknownUser();
    }

    if (this.props.isSendCompleted) {
      return this.renderSentResult();
    }

    return this.renderForm();
  }

  renderForm() {
    return (
      <div className="App">
        <div className="AppForm">
          <h1>Wake up {this.props.currentUser.name}…</h1>
          <h2>The Matrix has you…</h2>
          <h2>Free your mind on the 1st of April, 92A Suvorov st., at 6 P.M.</h2>

          <h2>But first, write down smth here about yourself that nobody knows</h2>

          <textarea value={this.props.text} onChange={this.handleChangeText}/>
          <button className={this.isDisabled() ? "disabled" : ""}
                  onClick={this.onSend}>
            {this.props.isFetching ? "Sending..." : "OK"}
          </button>

          <h2>It will help you</h2>

        </div>
      </div>
    );
  }

  renderSentResult() {
    return (
      <div className="App">
        <div className="AppForm">
          <h1>Follow the pink rabbit...</h1>
        </div>
      </div>
    );
  }

  renderUnknownUser() {
    return (
      <div className="App">
        <div className="AppForm">
          <h1>Do you want to die?</h1>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  text: state.text,
  isFetching: state.isFetching,
  isSendCompleted: state.isSendCompleted,
});

export default connect(
  mapStateToProps
)(App)
