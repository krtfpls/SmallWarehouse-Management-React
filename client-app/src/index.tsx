import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import { store, StoreContext } from './app/stores/store';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import {createBrowserHistory} from 'history';
import ScrollToTop from './app/layout/ScrollToTop';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store} >
    <HistoryRouter history={history}>
      <ScrollToTop/>
    <App />
    </HistoryRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
