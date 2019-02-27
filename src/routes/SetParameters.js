import CommandsAPI from '../api/Commands';
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox, PageHeader, Label } from 'react-bootstrap';
import LocalStorage from 'expired-storage';

export default class SetParameters extends Component {

    constructor(props) {
        super(props);
        this.commandsAPI = new CommandsAPI();
        this.localStorage = new LocalStorage();
        this.state = {
            commandName: "",
            commandParams: {},
            executionResult: {},
            hideError: true
        }
    }

    //this function is executed when the user submitted the form and command should be sent to be executed
    handleSubmit = event => {
        event.preventDefault();
        this.commandsAPI.executeCommand(this.state.commandName, this.state.commandParams).then((executionResult) => {

            this.localStorage.setItem('executionResult', JSON.stringify(executionResult))

            this.props.history.push({
                pathname: "/execresults",
            })
        }).catch(() => {
            this.setState({hideError: false})
        })
    }

    //this function is to handle change of form controls (text-boxes)
    handleChange = event => {
        this.state.commandParams[event.target.id] = event.target.value
    }

    //this function is to handle change of checkboxes
    handleCheck = event => {
        this.state.commandParams[event.target.id] = event.target.checked
    }

    //this function creates a FormGroup tag for each param of a given command, in corresponding to the param type.
    createCommandButtons(command) {
        var params = command.params.map((param) => {

            //it is not possible to use setState function to update a specific property of an object, therefor, using this.state directly
            this.state.commandParams[param.name] = param.initialValue
            switch (param.type) {

                case 'boolean':
                    return (
                        <FormGroup key={param.name}>
                            <ControlLabel>{param.displayName}</ControlLabel>
                            <Checkbox
                                id={param.name}
                                key={param.name}
                                onChange={this.handleCheck}>
                            </Checkbox>
                        </FormGroup>
                    );

                case 'text':
                    return (
                        <FormGroup key={param.name} controlId={param.name}>
                            <ControlLabel>{param.displayName}</ControlLabel>
                            <FormControl
                                key={param.name}
                                type="text"
                                onChange={this.handleChange}
                                defaultValue={param.initialValue}
                                placeholder={param.placeholder}/>
                        </FormGroup>
                    );

                case 'number':
                    return (
                        <FormGroup key={param.name} controlId={param.name}>
                            <ControlLabel>{param.displayName}</ControlLabel>
                            <FormControl
                                key={param.name}
                                type="number"
                                onChange={this.handleChange}
                                defaultValue={param.initialValue}
                                placeholder={param.placeholder}/>
                        </FormGroup>
                    );

                default:
                    return ('code will never execute here, but a default case has to be written');
            }
        });
        return params
    }

    render() {
        var command = JSON.parse(this.localStorage.getItem('command'));
        if (command != null) {
            this.state.commandName = command.name;
            var buttons = this.createCommandButtons(command)
            return (
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="formBasicText">
                        <PageHeader>
                            {command.name}
                        </PageHeader>
                        <PageHeader>
                            <small>{command.description}</small>
                        </PageHeader>
                    </FormGroup>
                    {buttons}
                    <FormGroup>
                        <Button
                            type="submit">Submit
                        </Button>
                        <Label
                            bsStyle="danger"
                            hidden={this.state.hideError}>
                            unable to send command
                        </Label>
                    </FormGroup>
                </form>
            );
        }
        else
            //no command object found in local storage, redirect to commands page
            window.location = '/commands'
    }
}