import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import LocalStorage from 'expired-storage';

export default class ExecResults extends Component {

    constructor(props) {
        super(props);
        this.localStorage = new LocalStorage();
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.history.push({
            pathname: "/commands"
        })
    }

    render() {
        const executionResult = JSON.parse(this.localStorage.getItem('executionResult'));
        if (executionResult != null) {

            //set the style of the panel depending on the success or failure of the execution
            executionResult.success ? executionResult.style = "success" : executionResult.style = "danger";

            return (
                <div>
                    <Panel bsStyle={executionResult.style}>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">
                                {executionResult.result.name}
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            {executionResult.result.favoriteColor}
                        </Panel.Body>
                    </Panel>
                    <form onSubmit={this.handleSubmit}>
                        <Button
                            block
                            bsStyle="primary"
                            bsSize="large"
                            type="submit">
                            Back
                        </Button>
                    </form>
                </div>
            );
        }
        else window.location = '/commands';
    }
}