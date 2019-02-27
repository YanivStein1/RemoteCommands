import React from 'react';
import LocalStorage from 'expired-storage';

export default class TokenValidator extends React.Component {

    isTokenExpired() {
        var localStorage = new LocalStorage();
        if (localStorage.getItem('userToken') == null)
            return true;
        else
            return false;
    }

    render() {

        //if token is expired redirect to login page
        if (this.isTokenExpired() && window.location.pathname !== '/')
            window.location = '/';

        //if token is valid and current page is login page, redirect to commands page
        else if (!this.isTokenExpired() && window.location.pathname == '/')
            window.location = '/commands'

        else
            return this.props.children;
    }
}