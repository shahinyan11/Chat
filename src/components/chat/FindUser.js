import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {getRoomOnlineUsers} from "../../store/actions/chat";
import {connect} from "react-redux";

class FindUser extends Component {

    render() {
        return (
            <div className={"FindUser"}>
                <Button onClick={this.handleClick} variant="outline-dark">
                    <div className={'text'}>Find a user</div>
                    <img src={`/images/icons/chat/account_search.svg`} alt=""/>
                </Button>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
});

const mapDispatchToProps = {
    getRoomOnlineUsers,
};

const FindUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FindUser);

export default FindUserContainer;
