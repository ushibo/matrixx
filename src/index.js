import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import App from './App';
import './index.css';

ReactDOM.render(
    <Router>
        <div id="full">
            <div id="background"></div>
            <div id="midground"></div>
            <div id="foreground"></div>
            <Route path="/" component={App}/>
        </div>
    </Router>,
    document.getElementById('root')
);
