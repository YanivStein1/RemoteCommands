import CommandsAPI from  '../api/Commands';
import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import LocalStorage from 'expired-storage';

export default class Commands extends Component {

    constructor(props) {
        super(props);
        this.commandsAPI = new CommandsAPI();
        this.localStorage = new LocalStorage();
        this.state = {
            commandList: {
                commands: [],
                success: false
            }
        };
    }

    componentDidMount() {
        this.commandsAPI.getAllCommands().then((commandList) => {
            this.setState({commandList});
        }).catch(() => {
            this.setState({
                commandList: {
                    commands: [],
                    success: false
                }
            });
        });
    }


    //this function is executed when a command was chosen from the list
    handleClick(command) {
        //saving the chosen command to local storage
        this.localStorage.setItem('command', JSON.stringify(command))

        //continue to the next page
        this.props.history.push({
            pathname: "/SetParameters/",
        });
    }

    render() {

        if (!this.state.commandList.success)
            return 'Failed to retrieve commands from server';

        var buttons = this.state.commandList.commands.map((command) =>
            <Button
                bsStyle="primary"
                key={command.name}
                onClick={() => this.handleClick(command)}>
                {command.displayName}
            </Button>
        );

        return (
            <ButtonToolbar>
                {buttons}
            </ButtonToolbar>
        );


    }
}
