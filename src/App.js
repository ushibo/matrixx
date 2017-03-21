import React, {Component} from "react";
import jwtDecode from "jwt-decode";
// import * as Spreadsheet from 'edit-google-spreadsheet';

import * as GoogleSpreadsheet from 'google-spreadsheet';

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
  user;
  doc;

  componentWillMount = () => {
    const token = this.props.match.params.token;
    try {
      const decode = jwtDecode(token);
      this.user = new User(decode.name, decode.fullName);
    } catch (err) {

    }

    // Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1kgtFTmGc-TL8LuGaB3TP8UeMls5wdmxUadZe4zKFo9I/pubhtml',
    //   callback: function(data, tabletop) {
    //     console.log(data)
    //   },
    //   simpleSheet: true } );
    // this.doc = new GoogleSpreadsheet('1kgtFTmGc-TL8LuGaB3TP8UeMls5wdmxUadZe4zKFo9I');



  };

  onClick = () => {
    console.log("this", this.user.name);
    // this.doc.getInfo(function(err, info) {
    //   console.log('Loaded doc: '+info.title+' by '+info.author.email);
    //   const sheet = info.worksheets[0];
    //   console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
    // });
    {/*Spreadsheet.load({*/}
    //   debug: true,
    //   spreadsheetName: '1kgtFTmGc-TL8LuGaB3TP8UeMls5wdmxUadZe4zKFo9I',
    //   // OR 5. Dynamic Token
    //   accessToken: {
    //     type: 'Bearer',
    //     token: 'AIzaSyCffKB269iJ4r5udeIpAGeR5IpFembZgkQ'
    //   },
    // }, function sheetReady(err, spreadsheet) {
    //   console.log('err', err);
    //   console.log(spreadsheet);
    //
    //   //use speadsheet!
    // });
    GoogleSpreadsheet.url('https://spreadsheets.google.com/pub?key=1kgtFTmGc-TL8LuGaB3TP8UeMls5wdmxUadZe4zKFo9I&hl=en&output=html');
    GoogleSpreadsheet.load(function(result) {
      console.log('result', result);
    });
  };

  render() {

    return (
      <div className="App">
        <h1>Wake up {this.user.name}!</h1>
        <h2>The Matrix has you…</h2>
        <h2>Free your mind on the 1st of April, Suvorov st. 92, at 6 P.M.</h2>

        <h2>But now, write here smth about yourself that nobody </h2>
        <h2>knows____________</h2>
        <h2>It will help you</h2>

        <input type="text"></input>
        <button onClick={this.onClick}>OK</button>
      </div>
    );
  }

}

export default App;
