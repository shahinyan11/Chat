import React, {Component} from 'react'
import Wrapper from "../components/Wrapper";
import RoomList from "../components/chat/RoomList";
import '../asset/sass/chat.scss'
import CreateRoom from "../components/chat/CreateRoom";
import UserRoomSettings from "../components/chat/UserRoomSettings";
import {chatComponentMount, closeAllModals, getRooms} from "../store/actions/chat";
import {changeActiveMenu} from "../store/actions/menu";
import {setMatch} from "../store/actions/route";
import {connect} from "react-redux";
import RoomJoin from "../components/chat/RoomJoin";
import Room from "../components/chat/Room";
import {generateRoomName} from "../helpers/helper";

import {withRouter} from 'react-router-dom'
import Page404 from "./Page404";
import data from "../services/data";

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roomExist: true
        }
    }

    handleClick = (e) => {
        this.props.closeAllModals();
    }

    UNSAFE_componentWillMount() {
        const {user, getRooms, rooms} = this.props;
        if (user && (!rooms || !rooms[0])) {
            getRooms(user.id);
        }
        this.props.changeActiveMenu(data.menu.chat.id)
    }

    componentDidMount() {
        this.props.chatComponentMount(true)
    }

    componentWillUnmount() {
        this.props.chatComponentMount(false)
    }

    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
        const {user, match, rooms} = nextProps
        if (user !== this.props.user) {
            nextProps.getRooms(nextProps.user.id);
        }

        if (match.params !== this.props.match.params) {
            nextProps.setMatch(match)
            if (rooms) {

                if (match.path === "/chat/:roomName") {
                    let exist = false;
                    rooms.forEach((room) => {
                        if (room.id && generateRoomName(room.name) === match.params.roomName) {
                            exist = true
                        }
                    })
                    this.setState({
                        roomExist: exist
                    })
                } else if (match.path === "/chat") {
                    this.setState({
                        roomExist: true
                    })
                }
            }
        }
    }

    render() {
        const {
            selectedCreateRoom,
            activeRoomId,
            rooms,
            // user,
            selectedUserRoomSettings
        } = this.props;
        const BREAK_FOR_EACH = 'break';
        let roomJoined = null;
        try {
            rooms.forEach((value) => {
                if (Number(value.id) === Number(activeRoomId) && value.joinStatus) {
                    throw BREAK_FOR_EACH;
                } else {
                    roomJoined = false
                }
            });
        } catch (e) {
            if (e === BREAK_FOR_EACH) {
                roomJoined = true;
            }
        }
        return (
            <>
                {!this.state.roomExist ?
                    <Page404/>
                    :
                    <div id={'chat'} onClick={this.handleClick}>
                        <Wrapper>
                            <div className={'my_left_bar'}>
                                <div className={'sub_menu'}>
                                    <RoomList/>
                                </div>
                            </div>
                            <div className={'my_container'}>
                                {
                                    selectedCreateRoom ?
                                        <CreateRoom/>
                                        : selectedUserRoomSettings ?
                                        <UserRoomSettings/>
                                        : null
                                }
                                {
                                    roomJoined === true?
                                        <Room/>
                                        : roomJoined === false ?
                                        <RoomJoin/>
                                        : null
                                }
                            </div>
                        </Wrapper>
                    </div>

                }
            </>

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    selectedCreateRoom: state.chat.selectedCreateRoom,
    selectedUserRoomSettings: state.chat.selectedUserRoomSettings,
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,

});

const mapDispatchToProps = {
    closeAllModals,
    setMatch,
    getRooms,
    chatComponentMount,
    changeActiveMenu
};

const ChatContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Chat);

export default withRouter(ChatContainer);
