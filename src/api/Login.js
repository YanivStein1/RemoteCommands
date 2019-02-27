/**
 * Created by Yaniv on 4/8/18.
 */

import axios from 'axios';

export default class LoginAPI {

    Login(email, password) {
        return new Promise((resolve, reject) => {
            if (true) //this line is for testing the LoginAPI
                resolve({
                    "success": true,
                    "token": 'token',
                    "expiration": "Thu Dec 1 2019 00:00:00 GMT-0500 (EST)",
                });
            else reject({
                "success": false,
                "error": "user/pass combination is incorrect",
                "errorCode": 1000
            })
        });
    }

    //This function is never used because I haven't wrote a server yet.
    LoginWithServer(email, password) {

        axios.post(`http://SERVER_ADDRESS_FROM_CONFIG_FILE:SERVER_PORT`, {email: email, password: password})
            .then(res => {
                return (res)
            })
    }
}


