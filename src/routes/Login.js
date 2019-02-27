import React, { Component } from 'react';
import LoginAPI from '../api/Login';
import { Button, FormGroup, FormControl, Label } from 'react-bootstrap';
import LocalStorage from 'expired-storage';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.LoginAPI = new LoginAPI();
        this.localStorage = new LocalStorage();
        this.state =
            {
                email: "",
                password: "",
                errorObject: {},
                hideError: true
            };
    }

    handleSubmit = event => {
        event.preventDefault();
        this.LoginAPI.Login(this.state.email, this.state.password).then((authResponse) => {

            //user logged in successfully
            //setting the token and expiration in local storage
            var expirationTimeInSeconds = this.calculateTokenExpirationInSeconds(authResponse.expiration)
            this.localStorage.setItem('userToken', authResponse.token, expirationTimeInSeconds);

            //continue to the next page
            this.props.history.push({
                pathname: "/commands"
            });

        }).catch((authResponse) => {

            this.setState({
                hideError: false,
                errorObject: authResponse
            });

        });
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    //this function calculates the token's validity period in seconds
    calculateTokenExpirationInSeconds(expirationDate) {
        var tokenExpirationDate = new Date(expirationDate);
        var ExpirationInSeconds = tokenExpirationDate - new Date()
        return ExpirationInSeconds;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormControl
                            placeholder="email"
                            autoFocus
                            type="email"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormControl
                            placeholder="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        Login
                    </Button>
                    <Label
                        bsStyle="danger"
                        hidden={this.state.hideError}>
                        {this.state.errorObject.error}
                    </Label>
                </form>
            </div>
        );
    }
}