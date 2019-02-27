/**
 * Created by Yaniv on 4/8/18.
 */
import axios from 'axios';

export default class CommandsAPI {

    getAllCommands() {
        return new Promise((resolve,reject) => {
            resolve({
                success: true,
                commands: [
                    {
                        name: 'commandName1',
                        displayName: 'commandDisplay1',
                        description: 'commandDescription1',
                        params: [
                            {
                                name: 'textParam',
                                displayName: 'textParam',
                                placeholder: 'placeholder',
                                type: 'text',
                                initialValue: 'text'
                            },
                            {
                                name: 'NumberParam',
                                displayName: 'NumberParam',
                                placeholder: 1,
                                type: 'number',
                                initialValue: 1
                            },
                            {
                                name: 'BoolParam',
                                displayName: 'BoolParam',
                                placeholder: 'false',
                                type: 'boolean',
                                initialValue: false
                            }
                        ]
                    },
                    {
                        name: 'commandName2',
                        displayName: 'commandDisplay2',
                        description: 'commandDescription2',
                        params: [
                            {
                                name: 'textParam2',
                                displayName: 'textParam',
                                placeholder: 'placeholder',
                                type: 'text',
                                initialValue: 'text'
                            },
                            {
                                name: 'NumberParam2',
                                displayName: 'NumberParam',
                                placeholder: 1,
                                type: 'number',
                                initialValue: 1
                            },
                            {
                                name: 'BoolParam2',
                                displayName: 'BoolParam',
                                placeholder: 'true',
                                type: 'boolean',
                                initialValue: true
                            }
                        ]
                    }
                ]
            })
        })
    }


    executeCommand(commandName, CommandParams) {
        return new Promise((resolve, reject) => {
            resolve(
                {
                    success: true,
                    result: {
                        name: 'Yaniv',
                        age: 27,
                        favoriteColor: 'red'
                    }
                });
        })
    }


    //just an example for how it will look like when actually sending a request to the server
    getAllCommandsWithServer(token) {
        axios.post(`http://127.0.0.1:8080/commands`, token)
            .then(res => {
                return res.data
            })
    }
}