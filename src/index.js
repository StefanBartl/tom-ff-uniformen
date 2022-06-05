import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
        {/* <Auth0Provider
          domain="wkddatabase.eu.auth0.com"
          clientId="51jRbnTsfujYk3tUMUnZssSWejVV1me6"
          redirectUri={'https://stefanbartl.github.io/tom-ff-uniformen/'}
        > */}

            <App />
      
      {/* </Auth0Provider>, */}
  
  </React.StrictMode>
);
