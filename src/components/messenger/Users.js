import React from 'react';
import {connect} from "react-redux";
import {selectUser} from "../../store/actions/messenger"
import {getMessages} from "../../store/actions/messenger"
import {getAvatar} from "../../helpers/helper"
// import Emitter from "../../helpers/Emmiter";
// import {MDBCol, MDBIcon} from "mdbreact";


class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUserId: null,
            onlineUsers: [],
            searchValue: ''
        }

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { authSelectedUserId, getMessages} = nextProps;
        if (authSelectedUserId !== this.props.authSelectedUserId) {
            this.setState({
                selectedUserId : authSelectedUserId
            })
            getMessages(authSelectedUserId)
        }
        return true
    }

    componentDidMount() {
        const { authSelectedUserId} = this.props;
        this.setState({
            selectedUserId : authSelectedUserId
        })
    }

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    };

    handleClick = (id) => {
        const {getMessages, selectUser} = this.props;
        this.setState({
            selectedUserId: id
        })
        getMessages(id);
        selectUser(id)
    };

    render() {
        const { onlineUsers, user} = this.props;
        let {selectedUserId, searchValue} = this.state;
        const filterUserList = onlineUsers.filter((value) => {
            return (
                (searchValue === '' ||
                value.screen_name.toLowerCase().search(searchValue.toLowerCase()) === 0)
                && Number(user.id) !== Number(value.id)
            ) ? true : false
        })
        return (
            <>
                {
                    onlineUsers.length > 1 ?
                        <form className="findUser form-inline mb-4 ">

                                <input className="form-control form-control-sm"
                                       type="text"
                                       placeholder="Search"
                                       onChange={this.handleChange}
                                       value={searchValue}
                                       aria-label="Search"
                                />
                                <img src="/images/icons/account_search.svg" alt=""/>

                        </form>
                        : null
                }
                <div className={'online_users'}>
                    <ul>
                        {
                            filterUserList.length === 0 ?
                                <li>
                                    No online users
                                </li>
                                : filterUserList.map((value) => (

                                    <li
                                        onClick={() => {
                                            this.handleClick(value.id)
                                        }}
                                        key={value.id}
                                        className={`pointer ${selectedUserId === value.id ? 'active' : ''}`}
                                    >
                                        <div className={'left text'}>
                                            <div className={'avatar'}>
                                                {getAvatar(value)}
                                                <div className={`status online`}></div>
                                                {/*<div className={*/}
                                                {/*    `status ${onlineUsers.indexOf(value.id) !== -1 ? 'online' : 'offline'}`*/}
                                                {/*}></div>*/}
                                            </div>
                                            {value.screen_name}
                                        </div>
                                        <div className={'right text'}>
                                            <div className={'gender'}><b>{value.gender}</b></div>
                                            <img src={`/images/icons/chat/video.svg`} alt=""/>
                                        </div>
                                    </li>

                                ))}
                    </ul>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    usersInRoom: state.menu.usersInRoom,
    activeSubChildName: state.menu.activeSubChildName,
    usersList: state.auth.usersList,
    authSelectedUserId: state.messenger.selectedUserId,
    onlineUsers: state.auth.onlineUsers,
});

const mapDispatchToProps = {
    selectUser,
    getMessages
};

const UsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Users);

export default UsersContainer;

