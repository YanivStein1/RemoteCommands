import React from 'react';
import './App.css';
import ErrorBoundary from "./helpers/ErrorBoundary";
import TokenValidator from "./helpers/TokenValidator";



import Routes from './routes';


export default () => (
    <ErrorBoundary>
        <TokenValidator>
        <Routes />
        </TokenValidator>
    </ErrorBoundary>
);




