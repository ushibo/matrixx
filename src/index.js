import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import App from './App';
import NotFound from './NotFound';
import './index.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={NotFound}/>
            <Route path="/:token" component={App}/>
        </div>
    </Router>,
    document.getElementById('root')
);
