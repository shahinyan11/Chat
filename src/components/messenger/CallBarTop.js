import React, {Component} from 'react';
import {connect} from "react-redux";
import {call, giveCall, downCall, calling, callInYou} from "../../store/actions/messenger"
import {selectUser} from "../../store/actions/menu"
import Calling from "./Calling";

const audio = new Audio("/audios/_ring.mp3")
class CallBarTop extends Component {

    constructor(props) {
        super(props);
        this.downCall = this.downCall.bind(this);
        this.state = {callGive : this.props.callGive,callingInYou : this.props.callingInYou}
    }

    componentDidMount() {
        const {callingInYou } = this.props;
        if(callingInYou){
            audio.play();
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {callingInYou, callGive,inCalling} = nextProps;
        if(callingInYou){
            var isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2;
            if (!isPlaying) {
                audio.play();
            }
        }

        if((!inCalling && !callingInYou) || callGive)
        {
            audio.pause();
        }
        return true
    }

    handleClick = (calling) => {
        this.props.call(calling);
        if (!calling) {
            this.downCall()
        }else{
            //Automatically downcall when no body can receive call.
            setTimeout(() => 
            {
                if(!this.props.callGive && !this.props.callingInYou){
                    this.downCall();
                    this.props.call(false);
            }}, parseInt(audio.duration % 60) * 1000);
        }
    }

    giveCall = () => {
        const{peer, peerData, giveCall,callingInYou,callGive} = this.props;
        giveCall(true);
        peer.signal(peerData);
        if(callingInYou){
            var isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2;
            if (!isPlaying) {
                audio.play();
            }
        }
        this.setState({callGive : callGive,callingInYou : callingInYou});
    }

    downCall = () =>{
        const{peer, downCall, calling, callingInYou, callUserId, callInYou, peerData,user,liveCallId } = this.props;
        if(callingInYou){
            audio.pause();
        }  
        if(liveCallId){
             downCall(true);
             callInYou(false);
             calling({
                 access      : false,
                 toId        : callUserId,
                 userId      : user.id,
                 messageType : 'call',
                 callId      : liveCallId,
                 data        : {...peerData, type: 'answer', }
             })
             audio.pause();
             downCall(false);
         }else{
             if(peer){
                 downCall(true);
                 peer.destroy()
             }
        }
    }

    render() {
        const {onlineUsers, selectedUserId, inCalling, callingInYou, callGive} = this.props;
        const selectedUser = onlineUsers.filter(user=> {
            if(Number(user.id) === Number(selectedUserId)){
                return user;
            }
        })[0];
        return (
            <>
                <div className={'contentTop'}>
                    <ul>
                        <li>{inCalling && `CALLING`} {callingInYou && `CALL FROM`} {selectedUser.screen_name}</li>
                        {
                            inCalling && !callGive ? 
                            <li>
                                <div className="user_call">
                                    <div className="icon pointer calling" onClick={() => {
                                                    this.handleClick(!inCalling);
                                                    audio.pause();
                                                }}>
                                        <img src="/images/icons/phone-hangup.svg" alt=""/>
                                    </div>
                                </div>
                                <span className="icon_text">CANCEL</span>
                            </li> : null
                        }

                        {
                            callingInYou && !callGive?
                            <li>
                                <div className="user_call">
                                    <div className="icon pointer calling" onClick={this.downCall}>
                                        <img src="/images/icons/phone-hangup.svg" alt=""/>
                                    </div>
                                </div>
                                <span className="icon_text">REJECT</span>
                            </li> : null
                        }

                        {
                            callingInYou && !callGive? 
                            <li>
                                <div className="user_call">
                                    <div className="icon pointer" onClick={this.giveCall}>
                                        <img src="/images/icons/phone.svg" alt=""/>
                                    </div>
                                </div>
                                <span className="icon_text">ANSWER</span>
                            </li> : null
                        }

                        {
                            !inCalling && !callingInYou? 
                            <li>
                                <div className="user_call">
                                    <div className="icon pointer" onClick={() => {
                                                    this.handleClick(!inCalling);
                                                    audio.play();
                                                }}>
                                        <img src="/images/icons/phone.svg" alt=""/>
                                    </div>
                                </div>
                                <span className="icon_text">CALL</span>
                           </li> : null
                        }
                    </ul>
                    {
                        callGive ? <Calling selectedUser={selectedUser}/> : null
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedUserId: state.messenger.selectedUserId,
    onlineUsers: state.auth.onlineUsers,
    inCalling: state.messenger.inCalling,
    callingInYou: state.messenger.callingInYou,
    usersList: state.auth.usersList,
    peer: state.messenger.peer,
    peerData: state.messenger.peerData,
    callUserId: state.messenger.callUserId,
    callGive: state.messenger.callGive,
    callDown: state.messenger.callDown,
    liveCallId: state.messenger.liveCallId,
    user: state.auth.user,
});

const mapDispatchToProps = {
    call,
    selectUser,
    giveCall,
    downCall,
    calling,
    callInYou
};

const CallBarTopContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CallBarTop);

export default CallBarTopContainer;
