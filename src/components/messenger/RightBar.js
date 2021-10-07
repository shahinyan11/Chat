import React from 'react';
import {connect} from "react-redux";
import {call, giveCall, downCall, calling, callInYou} from "../../store/actions/messenger"
import {selectUser} from "../../store/actions/menu"
import Gallery from './Gallery';
import {ClipLoader} from "react-spinners";

class RightBar extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        const {userMessages} = this.props;
        let loading = true;
        userMessages.map((value, index) => (
         value ? loading = false : ''  
        ));

        return (
                <>
                <div className="top"></div>
                <div className="center">
                 {
                        userMessages.map((value, index) => (
                            <Gallery key={index} data={value}/>
                        ))
                    }
                       <div className='sweet-loading'>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={150}
                            color={'#123abc'}
                            loading={loading}
                        />
                    </div>
                </div>
                <div className="bottom">
                </div>
                </>
        );
    }
}

const mapStateToProps = (state) => ({
    inCalling: state.messenger.inCalling,
    callingInYou: state.messenger.callingInYou,
    usersList: state.auth.usersList,
    authSelectedUserId: state.messenger.selectedUserId,
    peer: state.messenger.peer,
    peerData: state.messenger.peerData,
    callUserId: state.messenger.callUserId,
    callGive: state.messenger.callGive,
    callDown: state.messenger.callDown,
    user: state.auth.user,
    liveCallId: state.messenger.liveCallId,
    onlineUsers: state.auth.onlineUsers,
    userMessages: state.messenger.userMessages,
});

const mapDispatchToProps = {
    call,
    selectUser,
    giveCall,
    downCall,
    calling,
    callInYou
};

const RightBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightBar);

export default RightBarContainer;
