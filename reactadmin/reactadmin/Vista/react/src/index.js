import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './app.component';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import portalApp from './reducers';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert/dist/sweetalert.css';


WebFont.load({
  google: {
    families: ['Barlow:300,400,400i,500,600,700']
  }
});

const store = createStore(portalApp);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
