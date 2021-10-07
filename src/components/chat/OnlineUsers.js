import React, {Component} from 'react';
import {connect} from "react-redux";
import {getRoomOnlineUsers, toggleUserModal} from "../../store/actions/chat";
import {getAvatar} from "../../helpers/helper";
import UserModal from "./popups/UserModal";

class OnlineUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            onlineUsers: [],
            searchValue: ''
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {activeRoomId, getRoomOnlineUsers} = this.props;
        if(activeRoomId !== prevProps.activeRoomId){
            getRoomOnlineUsers(activeRoomId)
        }
    }

    componentDidMount() {
        const {activeRoomId, getRoomOnlineUsers} = this.props;
        getRoomOnlineUsers(activeRoomId)
    }

    handleClick = (e, userId) => {
        e.stopPropagation();
        this.props.toggleUserModal(userId)
    }

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }

    render() {
        const {roomOnlineUsers, modals} = this.props;
        const {searchValue} = this.state;
        const {userModal} = modals;
        const filterUserList = roomOnlineUsers.filter((user) => {
            return searchValue === '' || user.screen_name.toLowerCase().search(searchValue.toLowerCase()) === 0 ? true : false
        })
        return (
            <>
                <div className={'online_users'}>
                    <ul>
                        {
                            filterUserList.length === 0 ?
                                <li>
                                    No online users
                                </li>
                                : filterUserList.map((user) => (
                                    <li
                                        key={user.id}
                                        // className={`pointer ${selectedUserId === value.id ? 'active' : ''}`}
                                    >
                                        <div className={'left text'}>
                                            <div className={'avatar'} onClick={(e) => {
                                                this.handleClick(e, user.id)
                                            }}>
                                                {getAvatar(user)}
                                                <div className={`status online`}></div>
                                                {/*<div className={*/}
                                                {/*    `status ${onlineUsers.indexOf(value.id) !== -1 ? 'online' : 'offline'}`*/}
                                                {/*}></div>*/}
                                                {
                                                    userModal.open && Number(userModal.id) === Number(user.id) ?
                                                        <UserModal userData={user}/> : null
                                                }
                                            </div>
                                            {user.screen_name}
                                        </div>
                                        <div className={'right text'}>
                                            <div className={'gender'}><b>{user.gender}</b></div>
                                            <img src={`/images/icons/chat/video.svg`} alt=""/>
                                        </div>
                                    </li>

                                ))
                        }
                    </ul>
                </div>
                {
                    filterUserList.length > 1 ?
                    <div className={'findUser'}>
                        <form>
                            <div>
                                <input onChange={this.handleChange} value={searchValue} type="text"
                                       placeholder="Find a user"
                                       aria-label="Search"
                                />
                            </div>
                            <img src={`/images/icons/account_search.svg`} alt=""/>
                        </form>
                    </div>
                    : null
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    roomUsers: state.chat.roomUsers,
    roomOnlineUsers: state.chat.roomOnlineUsers,
    modals: state.chat.modals
});

const mapDispatchToProps = {
    getRoomOnlineUsers,
    toggleUserModal
};

const OnlineUsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OnlineUsers);

export default OnlineUsersContainer;
