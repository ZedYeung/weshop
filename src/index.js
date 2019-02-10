import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { STRIPE_PUBLISHABLE_KEY } from './.env';

ReactDOM.render(
    <BrowserRouter>
          <StripeProvider apiKey={STRIPE_PUBLISHABLE_KEY}>
            <App />
          </StripeProvider>

    </BrowserRouter>, document.getElementById('root'));
serviceWorker.register();