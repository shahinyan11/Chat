import React, {Component} from 'react';
import {connect} from "react-redux";
import {roomJoin, getRooms, toggleUserModal} from "../../store/actions/chat";
import {getAvatar} from "../../helpers/helper";
import {Button, Col, Form} from "react-bootstrap";
import UserModal from "./popups/UserModal";

class RoomJoin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: ''
        };

    }

    handleChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleClick = (e, userId) => {
        e.stopPropagation();
        this.props.toggleUserModal(userId)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {activeRoomId, roomJoin} = this.props;
        roomJoin(activeRoomId, this.state.password);
    };

    getRoom = () => {
        const {activeRoomId, rooms} = this.props;
        let room = null;
        rooms.forEach((value) => {
            if (value.id === activeRoomId) {
                room = value
            }
        })
        return room
    };

    render() {
        const {modals, roomLocked, roomJoinError} = this.props;
        const {password} = this.state;
        const {userModal} = modals;
        const room = this.getRoom();

        const user = {
            screen_name: room ? room.owner_screen_name : null,
            avatar: room ? room.owner_avatar : null,
            id: room ? room.owner_id : null
        }
        return (
            <Form id={'RoomJoin'} className={'text'} onSubmit={this.handleSubmit}>
                <div>
                    <h2 className={'mb-5 text-uppercase'}>{room.name}</h2>
                    {
                        room.privacy === "user" ?
                            <div className={'text user'}>
                                <div>
                                    <h4><b>by</b></h4>
                                </div>
                                <div className={'avatar'}
                                     onClick={(e) => {
                                         this.handleClick(e, user.id)
                                     }}>
                                    <div className={'hover'}></div>
                                    {getAvatar(user)}
                                    {/*<div className={`status online`}></div>*/}
                                    {
                                        userModal.open && Number(userModal.id) === Number(user.id) ?
                                            <UserModal userData={user}/> : null
                                    }
                                </div>
                                <div><h4><b>{user.screen_name}</b></h4></div>
                            </div>
                            : <h3><b>Room rules !!!</b></h3>
                    }
                    {
                        room && room.description ?
                            <p className={'text'}>
                                {room.description}
                            </p>
                            : <p className={'text'}>
                                In the Sprint 154 Update of Azure DevOps, we are releasing the Azure Pipelines for Jira app
                                to
                                the <br/>
                                Atlassioan marketplace. The integration adds links to Jira issues work items deployed with
                                the <br/>
                                releases and allows you to view depoyment details directly in Jira issue.
                            </p>
                    }

                    {
                        roomLocked ?
                            <>
                                <div className={'lock'}>
                                    <img src={`/images/icons/chat/lock_open.svg`} alt=""/>
                                    <ul className={'stars title'}>
                                        <li>*</li>
                                        <li>*</li>
                                        <li>*</li>
                                        <li>*</li>
                                    </ul>
                                </div>

                                {
                                    roomJoinError && roomJoinError.status === 404 ?
                                        <Form.Row className={'errorMessage title '}>
                                             <b className={'text-uppercase'}>{roomJoinError.data.message}</b>
                                        </Form.Row>
                                        : null
                                }


                                <Form.Row>
                                    <Form.Group controlId="formGridPassword">
                                        <Form.Control onChange={this.handleChange} type="password" name="password"
                                                      value={password}/>
                                    </Form.Group>
                                </Form.Row>
                                <span className={'title mb-3'}> This room is private, enter the room password to join</span>
                            </>
                            : null
                    }
                    {
                        roomJoinError  ?
                            <Form.Row className={'errorMessage title '}>
                                <b className={'text-uppercase'}>{roomJoinError.data.error}</b>
                            </Form.Row>
                            : null
                    }
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button className={'submit'} type="submit">
                                JOIN
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </div>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
    user: state.auth.user,
    roomLocked: state.chat.roomLocked,
    modals: state.chat.modals,
    roomJoinError: state.error.roomJoinError
});

const mapDispatchToProps = {
    roomJoin,
    getRooms,
    toggleUserModal
};

const RoomJoinContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoomJoin);

export default RoomJoinContainer;
