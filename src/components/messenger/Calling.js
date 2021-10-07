import React, {Component} from 'react';
import {connect} from "react-redux";
import {setUserVideo, setMyVideo, call, giveCall, downCall, calling, callInYou} from "../../store/actions/messenger"
import {getAvatar} from "../../helpers/helper"
import MediaHandler from './MediaHandler';
import {Rnd} from 'react-rnd';

class Calling extends Component {
    constructor(props) {
        super(props);
        this.DownCall = this.DownCall.bind(this);
        this.state = {isCallOn: true, ZoomIn : false, isMute:false};
        this.mediaHandler = new MediaHandler();
	    this.muteUnmute = this.muteUnmute.bind(this);
    }

    componentWillMount() {
        this.mediaHandler.getPermissions(false)
        .then((stream) => {
            try {
                this.myVideo.srcObject = stream;
            } catch (e) {
                this.myVideo.src = URL.createObjectURL(stream);
            }
            this.myVideo.volume = 0;
            this.myVideo.muted = 0;
            this.myVideo.play();

            // var isPlaying = this.myVideo.currentTime > 0 && !this.myVideo.paused && !this.myVideo.ended && this.myVideo.readyState > 2;
            // if (!isPlaying) {
            // }else{
            //     this.myVideo.pause();
            // }
        })
    }

    muteUnmute() {
        if(this.state.isMute){
            this.setState({isMute : false});
            this.myVideo.muted = false;
        }else{
            this.setState({isMute : true}); 
            this.myVideo.volume = 0;
            this.myVideo.muted = true;
        }
    }

    DownCall = (e) => {
        e.preventDefault();
        const{peer, downCall, calling, callUserId, callInYou, peerData,user,liveCallId} = this.props;
        this.setState({isCallOn: false});
        this.myVideo.pause();
        this.userVideo.pause();
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
             downCall(false);
             this.props.call(false);
         }else{
             if(peer){
                 downCall(true);
                 peer.destroy()
             }
        }
    }

    ZoomIn = () => {
        this.state.ZoomIn ? this.setState({ZoomIn : false}) : this.setState({ZoomIn : true});
    }

    render() {
        const {callGive, callingInYou, selectedUser,userVideoAccess,userVideo,peer} = this.props;
        if (userVideoAccess) {
            if (userVideo) {
                try {
                    this.userVideo[userVideo.srcObject ? 'srcObject' : 'src'] = userVideo.srcObject || userVideo.src;
                    this.userVideo.play();
                } catch (error) {
                    peer.destroy()
                }     
            }
        }else{
            if (userVideo) {
                this.userVideo.src= new MediaStream();
            }
        }
        
        return (
            <div>
                {this.state.isCallOn ?
                    <Rnd default={{
                        x: 0,
                        y: 112,
                        width: 500,
                        height: 297
                      }}
                      minWidth={500}
                      minHeight={297}
                      bounds="window" >
                        {/* <div className={'Calling'} >
                            <div className={'video-container'}> */}
                                <div className={`${callingInYou && !callGive ? 'off' : ''}`}>
                                <video preload="none" className="user-video" ref={(ref) => {
                                        this.userVideo = ref;
                                    }}> </video>
                                    <video preload="none" muted="muted" className={`my-video ${callingInYou && !callGive ? 'off' : callGive ? " " : "big"}`} ref={(ref) => {
                                        this.myVideo = ref;
                                    }}> </video>
                                 
                                </div> 
                            {/* </div> */}
                            <div className={`tools`}>
                                <div className={'avatar'}>
                                    {selectedUser && getAvatar(selectedUser)}
                                </div>
                                <div className={'author title'}>
                                    <b>{selectedUser && selectedUser.screen_name}</b>
                                </div>
                                <div className="user_call">
                                    <div className="icon pointer calling" onClick={this.DownCall}>
                                        <img src="/images/icons/phone-hangup.svg" alt=""/>
                                    </div>
                                </div>
                                <button onClick={this.muteUnmute} className="btn mute-btn" id="mute-btn">Mute/Unmute</button>
                                {/* <span onClick={this.ZoomIn}>Zoom In</span> */}
                            </div>
                        {/* </div> */}
                    </Rnd>
                : null};
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    userVideo: state.messenger.userVideo,
    myVideo: state.messenger.myVideo,
    otherUserId: state.messenger.otherUserId,
    callingInYou: state.messenger.callingInYou,
    callGive: state.messenger.callGive,
    callDown: state.messenger.callDown,
    userVideoAccess: state.messenger.userVideoAccess,
    videoCall: state.messenger.videoCall,
    peer: state.messenger.peer,
    callUserId: state.messenger.callUserId,
    liveCallId: state.messenger.liveCallId,
    peerData: state.messenger.peerData,
});

const mapDispatchToProps = {
    setUserVideo,
    setMyVideo,
    downCall,
    callInYou,
    call,
    giveCall,
    calling,
};

const CallingContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Calling);

export default CallingContainer;

