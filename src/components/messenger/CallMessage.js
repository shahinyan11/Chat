import React, {Component} from 'react';
import {connect} from "react-redux";
import {pastTime} from "../../helpers/helper";
import {getAvatar} from "../../helpers/helper";

class CallMessage extends Component {
    render() {
        const {onlineUsers, selectedUserId} = this.props;
        const selectedUser = onlineUsers.filter(user=> {
            if(Number(user.id) === Number(selectedUserId)){
                return user;
            }
        })[0];
        
        const {user} = this.props;
        const{call, author_id} = this.props.data;

        let icon  = '';
        let duration = '';
        if(call.dispositions === 'answered'){
            icon = Number(author_id ) === Number(user.id) ? 'phone-outgoing.svg' : 'phone-incoming.svg'
            duration = call.duration
        }else{
            icon = Number(author_id ) === Number(user.id) ? 'phone-noAnswer.svg' : 'phone-missed.svg'
            duration = Number(author_id ) === Number(user.id)  ? 'NO ANSWER' : 'MISSED CALL'
        }
        return (
            <>
                <div>
                    <div className={'avatar'}>
                        {selectedUser && getAvatar(selectedUser)}
                    </div>
                    <img src={`/images/icons/${icon}`} alt=""/>
                    <span>{duration}</span>
                    <span>{call.end ? pastTime(call.end) : ''}</span>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    onlineUsers: state.auth.onlineUsers,
    selectedUserId: state.messenger.selectedUserId,
});

const mapDispatchToProps = {

};

const CallMessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CallMessage);

export default CallMessageContainer;
