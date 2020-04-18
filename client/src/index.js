import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import FunctionalApp from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FunctionalApp />, document.getElementById('root'));
registerServiceWorker();
