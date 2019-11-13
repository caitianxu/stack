import "react-app-polyfill/ie9";
import "core-js";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import './style/basic.scss';

ReactDOM.render(<App />, document.getElementById('root'));