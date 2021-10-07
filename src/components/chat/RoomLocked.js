import React, {Component} from 'react';
import {getRooms, roomJoin} from "../../store/actions/chat";
import {connect} from "react-redux";
import {Button, Col, Form} from "react-bootstrap";
import AskForPassword from "./AskForPassword";

class RoomLocked extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            askPassword: false
        };

    }

    handleChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleClick = () => {
        this.setState({
            askPassword: true
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {activeRoomId, roomJoin} = this.props;
        roomJoin(activeRoomId, this.state.password);
    }

    render() {
        const {password, askPassword} = this.state;
        return (
            <>
                {
                    !askPassword ?
                        <Form id={'RoomLocked'} className={'text'} onSubmit={this.handleSubmit}>
                            <h2><b>THIS ROOM IS LOCKED.</b></h2>
                            <div>
                                <img src={`/images/icons/chat/lock_open.svg`} alt=""/>
                                <ul className={'stars title'}>
                                    <li>*</li>
                                    <li>*</li>
                                    <li>*</li>
                                    <li>*</li>
                                </ul>
                            </div>
                            <Form.Row>
                                <Form.Group controlId="formGridPassword">
                                    <Form.Control onChange={this.handleChange} type="password" name="password"
                                                  value={password}/>
                                </Form.Group>
                            </Form.Row>
                            <span className={'text'}>Enter the room password</span>
                            <p className={'text'}>
                                In the Sprint 154 Update of Azure DevOps, we are releasing the Azure Pipelines for Jira
                                app to
                                the <br/>
                                Atlassioan marketplace. The integration adds links to Jira issues work items deployed
                                with
                                the <br/>
                                releases and allows you to view depoyment details directly in Jira issue.
                            </p>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Button className={'save'} type="submit">
                                        JOIN
                                    </Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        : <AskForPassword/>

                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    user: state.auth.user
});

const mapDispatchToProps = {
    roomJoin,
    getRooms
};

const RoomLockedContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoomLocked);

export default RoomLockedContainer;
