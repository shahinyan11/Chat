import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {
    updateRoom,
    deleteRoom,
    selectedUserRoomSettings
} from "../../store/actions/chat";
import ConfirmDelete from "./ConfirmDelete";
import {getActiveRoom} from "../../helpers/helper";

class UserRoomSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: null,
            name: '',
            description: '',
            checked: false,
            retention: 0
        }
    }

    UNSAFE_componentWillMount() {
        const {userRoom, userRole, activeRoomId, rooms} = this.props;
        const moderator = userRole === 'moderator' ? true : false
        const room = moderator ? getActiveRoom(rooms, activeRoomId ) : userRoom;
        this.setState({
            name: room.name,
            description: room.description,
            checked: room.password,
            password: room.password,
            showConfirmation: false,
            retention:  room.retention
        })
    }

    close = () => {
        this.props.selectedUserRoomSettings('close')
    };

    handleCheck = (e) => {
        this.setState({
            checked: e.target.checked
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            userRoom,
            updateRoom,
            userRole,
            rooms,
            activeRoomId
        } = this.props;

        const moderator = userRole === 'moderator' ? true : false;
        const room = moderator ? getActiveRoom(rooms, activeRoomId ) : userRoom;
        const data = new FormData(e.target);
        data.append('_method', 'put');
        data.append('id', room.id);
        updateRoom(data)
    };

    deleteRoom = () => {
        this.setState({
            showConfirmation: true
        })
    };

    cancel =()=>{
        this.setState({
            showConfirmation: false
        })
    }

    deleteRoomConfirm = () => {
        const {
            userRoom,
            deleteRoom,
            history,
            userRole,
            rooms,
            activeRoomId
        } = this.props;
        const moderator = userRole === 'moderator' ? true : false;
        const room = moderator ? getActiveRoom(rooms, activeRoomId ) : userRoom;
        deleteRoom({room: room});
        history.goBack();
    };

    editName = (e) => {
        this.setState({
            name: e.target.value
        })
    };

    editRules = (e) => {
        this.setState({
            description: e.target.value
        })
    };
    editRetention = (e)=>{
        this.setState({
            retention: e.target.value
        })
    }

    render() {
        const {checked, name, description, password, showConfirmation, retention} = this.state;
        return (
            <>
                {
                    showConfirmation ?
                        <ConfirmDelete
                            confirm={this.deleteRoomConfirm}
                            cancel={this.cancel}
                        />
                        : <div className={'CreateRoom'}>
                            <img className={'close'} onClick={this.close} src={`/images/icons/close.svg`} alt=""/>
                            <Form className={'text'} onSubmit={this.handleSubmit}>
                                <h2 className={'title'}>{`Edit Room "${name}"`}</h2>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Room name</Form.Label>
                                        <Form.Control onChange={this.editName} type="text" name="name" value={name}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group>
                                    <Form.Label>Room rules</Form.Label>
                                    <Form.Control onChange={this.editRules} as="textarea" rows="10" name="description"
                                                  value={description}/>
                                </Form.Group>
                                <Form.Group className={'retention'}>
                                    <Form.Control  onChange={this.editRetention} type="number"  name="retention" min={0} value={retention}/>
                                    <Form.Label>Retention period</Form.Label>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Check onChange={this.handleCheck} type="checkbox"
                                                label="Require password to join"/>
                                </Form.Group>

                                {
                                    checked ?
                                        <Form.Row>
                                            {
                                                password ?
                                                    <Form.Group className={"mr-3"} controlId="formGridPassword">
                                                        <Form.Label>Old Password</Form.Label>
                                                        <Form.Control type="password" name="password"/>
                                                    </Form.Group>
                                                    : null
                                            }

                                            <Form.Group>
                                                <Form.Label>{`${password ? 'New' : ''} Password`}</Form.Label>
                                                <Form.Control type="password" name="new_password"/>
                                            </Form.Group>
                                        </Form.Row>
                                        : null
                                }
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Button className={'save'} variant="save" type="submit">
                                            Save
                                        </Button>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Button onClick={this.deleteRoom} className={'delete'} variant="delete"
                                                type="button">
                                            Delete room
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Button className={'cancel text'} onClick={this.close} variant="primary" type="button">
                                        CANCEL
                                    </Button>
                                </Form.Row>
                            </Form>
                        </div>
                }

            </>
        );
    }
}

const mapStateToProps = (state) => ({
    userRoom: state.chat.userRoom,
    userRole: state.auth.userRole,
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
});

const mapDispatchToProps = {
    selectedUserRoomSettings,
    updateRoom,
    deleteRoom
};

const UserRoomSettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserRoomSettings);

export default withRouter(UserRoomSettingsContainer);
