import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from 'react-router-dom'
import {getSubmenu, setSubmenuRooms, generateRoomName, getAvatar} from "../../helpers/helper";
// import {changeActiveRoom} from "../../store/actions/menu"
import CreateRoomButton from "./CreateRoomButton";
import {getRooms, selectCreateRoom, selectedUserRoomSettings, changeActiveRoom} from "../../store/actions/chat"
import {Badge} from 'react-bootstrap'
import data from "../../services/data";

class RoomList extends Component {

    componentDidMount() {
        this.roomNameInUrl()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {activeRoomId} = this.props;
        if (activeRoomId !== prevProps.activeRoomId) {
            this.roomNameInUrl()
        }


    }

    roomNameInUrl = () => {
        const {rooms, activeRoomId, history} = this.props;
        if (rooms) {
            rooms.forEach((room) => {
                if (Number(activeRoomId) === Number(room.id)) {
                    history.replace('/chat/' + generateRoomName(room.name))
                }
            })
        }
    }

    // UNSAFE_componentWillMount() {
    //     if (this.props.user) {
    //         this.props.getRooms(this.props.user.id);
    //     }
    // }
    //
    // UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
    //     if (this.props.user !== nextProps.user) {
    //         this.props.getRooms(nextProps.user.id);
    //     }
    // }

    toggleUserRoomSettings = (e) => {
        e.stopPropagation();
        this.props.selectedUserRoomSettings()
    }

    handleClick = (room) => {
        const elem = document.getElementById('Posts');
        let rememberPosition = null;
        if (elem) {
            rememberPosition = document.getElementById('Posts').scrollTop;
        }
        const {
            userRoom,
            selectCreateRoom,
            selectedUserRoomSettings,
            changeActiveRoom,
            // user
        } = this.props;
        changeActiveRoom(room.id, room.joinStatus, room.password, rememberPosition);
        selectCreateRoom('close');
        if (Number(userRoom.id) !== room.id) {
            selectedUserRoomSettings('close')
        }
    }

    render() {
        const {menu} = data;
        const {
            user,
            activeMenuId,
            activeRoomId,
            rooms,
            userRoom,
            userRole,
            // history,
            // match
        } = this.props;
        const moderator = userRole === 'moderator' ? true : false
        let subMenu = setSubmenuRooms(rooms, getSubmenu(Object.values(menu), activeMenuId));
        subMenu = Object.entries(subMenu);

        return (
            <>
                <div className={'RoomList'}>
                    {subMenu.map(([key, roomType]) => (
                        roomType.rooms.length > 0 || key === 'user' ?
                            <ul key={roomType.id}>
                                <li className={'submenu_title'}>
                                    <b>{roomType.name}</b>
                                </li>
                                {
                                    !userRoom.id && key === 'user' ?
                                        <li className={'myRoom'}>
                                            <CreateRoomButton/>
                                        </li>
                                        : null
                                }
                                {
                                    roomType.rooms.map((room) => (
                                        <li
                                            onClick={() => {
                                                this.handleClick(room)
                                            }}
                                            className={`pointer text ${Number(activeRoomId) === Number(room.id) ? 'active' : ''} ${room.owner_id === user.id ? 'separator' : ''}`}
                                            key={room.id}
                                        >
                                            <Link to={`/chat/${generateRoomName(room.name)}`} className={'roomName'}>
                                                <div>
                                                    {room.name}
                                                    {
                                                        moderator && room.report_count > 0 ?
                                                            <Badge variant="danger">{room.report_count}</Badge>
                                                            : room.unread > 0 ?
                                                            <Badge variant="success">{room.unread}</Badge>
                                                            : null
                                                    }

                                                </div>
                                            </Link>
                                            <div>
                                                {
                                                    room.id === userRoom.id || (moderator && activeRoomId === room.id) ?
                                                        <div>
                                                            <img onClick={this.toggleUserRoomSettings}
                                                                 src="/images/icons/settings.svg" alt=""/>
                                                        </div>
                                                        : room.joinStatus && !moderator ?
                                                        <img className={'room_join'} src="/images/icons/chat/check.svg"
                                                             alt=""/>
                                                        : room.password ?
                                                            <img className={'room_join'}
                                                                 src="/images/icons/chat/lock.svg" alt=""/>
                                                            : null
                                                }
                                                {
                                                    room.joinStatus && moderator && room.post_count > 0 ?
                                                        <div className={'postsCount'}>{room.post_count}</div>
                                                        : null
                                                }
                                                {/*{*/}
                                                {/*    room.privacy === 'user' && room.owner_id !== user.id ? */}
                                                {/*    getAvatar({id: room.owner_id,*/}
                                                {/*               avatar: 'small', */}
                                                {/*               screen_name : room.owner_screen_name*/}
                                                {/*              }) : ''*/}
                                                {/*}*/}
                                                {
                                                    key === 'user' && room.id !== userRoom.id ?
                                                        <div className={'avatar'}>
                                                            <div className={'hover'}></div>
                                                            {getAvatar(room)}
                                                        </div>
                                                        : null
                                                }
                                                <span className={'room_members'}>{room.roomUserCount}</span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            : null
                    ))}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    activeMenuId: state.menu.activeMenuId,
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
    selectedCreateRoom: state.chat.selectedCreateRoom,
    user: state.auth.user,
    userRole: state.auth.userRole,
    userRoom: state.chat.userRoom,
    globalMatch: state.route.globalMatch,
    roomExist: state.route.roomExist

});

const mapDispatchToProps = {
    changeActiveRoom,
    getRooms,
    selectCreateRoom,
    selectedUserRoomSettings
};

const RoomListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoomList);

export default withRouter(RoomListContainer);
