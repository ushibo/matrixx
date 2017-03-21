import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import App from './App';
import NotFound from './NotFound';
import './index.css';

ReactDOM.render(
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>

            <hr/>
            <Route exact path="/" component={NotFound}/>
            <Route path="/:token" component={App}/>
        </div>
    </Router>,
    document.getElementById('root')
);
