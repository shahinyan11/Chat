import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Chat from './pages/Chat'
import SingleAuth from "./components/SingleAuth";
import PrivateRouter from "./components/PrivateRouter";
import Messenger from "./pages/Messenger";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Secure from "./pages/Secure";
import Photo from "./pages/Photos";
import Forum from "./pages/Forum";
import {connect} from "react-redux";
import {
    addOnlineUsers,
    getUserInfo,
    getOnlineUsers,
    removeOnlineUsers
} from "./store/actions/auth"

import {
    newPost,
    newComment,
    removePost,
    addRoom,
    deleteRoom,
    newLike,
    getRoomOnlineUsers,
    kickFromRoom
} from "./store/actions/chat"
import {
    closeWindow
} from "./store/actions/index"

// import socketConnect from "./services/socket";
import Echo from 'laravel-echo'
import MediaHandler from "./MediaHandler"
import {
    calling,
    giveCall,
    setPeer,
    call,
    callInYou,
    setMyVideo,
    setUserVideo,
    setDefaultMessengerState,
    setCallUserId,
    changeUserVideoAccess,
    sendMessage,
    downCall,
    setLiveCallId,
    addMessage
} from "./store/actions/messenger";
import Peer from 'simple-peer';


class App extends Component {

    constructor(props) {
        super(props);


        this.state = {
            hasMedia: false,
            otherUserId: null
        };

        this.user = {
            stream: null
        };

        this.callTimeOut = null;
        this.peers = {};
        this.sendSignal = null;
        this.signalData = null;
        this.mediaHandler = new MediaHandler();

    }

    UNSAFE_componentWillMount() {
        if (localStorage.getItem('token')) {
            this.props.getUserInfo();
        }
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.handleWindowClose);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleWindowClose);
    }

    handleWindowClose = (e) => {
        e.preventDefault();
        this.props.closeWindow()
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {
            user,
            videoCall,
            // myVideo,
            // callUserId,
            inCalling
        } = this.props;
        this.user = nextProps.user;
        // window.stream = this.mediaHandler.getPermissions();
        (async () => {
            if (user !== nextProps.user && nextProps.user) {
                window.Echo = new Echo({
                    broadcaster: 'pusher',
                    authEndpoint: process.env.REACT_APP_BACKEND_URL + '/broadcasting/auth',
                    key: process.env.REACT_APP_MIX_PUSHER_APP_KEY,
                    cluster: process.env.REACT_APP_MIX_PUSHER_APP_CLUSTER,
                    wsHost: process.env.REACT_APP_PUSHER_URL,
                    wsPort: 6001,
                    wssPort: 6001,
                    disableStats: true,
                    auth: {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                    },
                    enabledTransports: ['ws', 'wss']
                });
                this.setupPusher();
            }
            if (inCalling !== nextProps.inCalling && nextProps.inCalling) {
                const {authSelectedUserId} = nextProps;
                const selectedUserId = authSelectedUserId;
                await this.callTo(selectedUserId)
            }
            if (videoCall !== nextProps.videoCall && (nextProps.inCalling || nextProps.callingInYou)) {
                this.props.calling({
                    access: true,
                    videoCall: nextProps.videoCall,
                    toId: nextProps.callUserId,
                    userId: nextProps.user.id,
                    // liveCallId  : nextProps.liveCallId,
                    messageType: 'change',
                    callId: nextProps.liveCallId,
                })

                // this.peers[callUserId] = await this.startPeer(callUserId, 'change');
            }

        })();

        return true
    }

    setupPusher = () => {
        const {
            callInYou,
            setPeer,
            callingInYou,
            giveCall,
            setCallUserId,
            // setUserVideo,
            setLiveCallId,
            activeRoomId
        } = this.props;
        window.Echo.channel('privatechat.' + this.user.id)
            .listen('PrivateMessageSent', async (e) => {

                let signal = e.message;
                if (signal.messageType === 'change') {
                    this.props.changeUserVideoAccess(signal.videoCall);
                }
                if (signal.messageType === 'call') {
                    if (signal.access) {
                        setCallUserId(signal.userId);
                        if (signal.data.type === 'offer') {
                            callInYou(true);
                            setLiveCallId(signal.callId)
                        } else {
                            giveCall(true)
                        }
                        this.props.changeUserVideoAccess(signal.videoCall);
                        let peer = this.peers[signal.userId];
                        // if peer is not already exists, we got an incoming call
                        if (peer === undefined) {
                            peer = await this.startPeer(signal.userId, 'call', false);
                        }
                        let res = {type: signal.data.type, sdp: signal.data.sdp + "\r\n"};
                        if (!callingInYou && signal.data.type !== 'offer') {
                            setPeer(peer, res);
                            peer.signal(res);
                        } else {
                            setPeer(peer, res)
                        }
                    } else {
                        if (this.peers[signal.userId]) {
                            this.peers[signal.userId].destroy()
                        } else {
                            let peer = this.peers[signal.userId];
                            // if peer is not already exists, we got an incoming call
                            if (peer === undefined) {
                                peer = await this.startPeer(signal.userId, 'call', false);
                            }
                            peer.destroy()
                        }
                    }
                } else if (signal.messageType === 'text') {
                    this.props.addMessage(e.message.data);
                }
            });
        window.Echo.channel('privatePost.' + this.user.id)
            .listen('Post', (e) => {
                const {data} = e.post;
                if (e.post.delete) {
                    this.props.removePost(e.post, false)
                } else {
                    this.props.newPost(data, activeRoomId);
                }
            });
        window.Echo.channel('like.' + this.user.id)
            .listen('Like', (e) => {
                const {data} = e;
                this.props.newLike(data);
            });
        window.Echo.channel('chatRoom.' + this.user.id)
            .listen('ChatRoomEvent', (e) => {
                switch (e.room.action) {
                    case 'ban':
                        this.props.deleteRoom(e.room, false);
                        break;
                    case 'delete':
                        this.props.deleteRoom(e.room, false);
                        break;
                    case 'add':
                        this.props.addRoom(e.room)
                        break;
                    case 'kick':
                        this.props.kickFromRoom(e.room.roomId)
                        break;
                    default:
                        break;
                }
            });
        window.Echo.channel('postComment.' + this.user.id)
            .listen('PostCommentSent', (e) => {
                this.props.newComment(e.comment.data);
            });

        window.Echo.join('chat.presence')
            .here((users) => {
                this.getOnlineUsers(users)
            })
            .joining((user) => {
                this.addOnlineUsers(user)
            })
            .leaving((user) => {
                const {callUserId, downCall, calling, liveCallId, peerData, inCalling, callingInYou} = this.props
                this.removeOnlineUsers(user);
                if (user.id === callUserId && (inCalling || callingInYou)) {
                    downCall(true);
                    calling({
                        access: false,
                        toId: callUserId,
                        userId: this.props.user.id,
                        messageType: 'call',
                        callId: liveCallId,
                        data: {...peerData, type: 'answer',}
                    })
                    this.props.setDefaultMessengerState()
                }
            });
    };


    startPeer = async (userId, messageType, initiator = true) => {
        let stream = null;
        try {
            stream = await this.mediaHandler.getPermissions()
        } catch (e) {
        }

        const peer = new Peer({
            initiator,
            stream: stream,
            trickle: false
        });

        try {
            this.props.setMyVideo({srcObject: stream})
        } catch (e) {
            this.props.setMyVideo({src: URL.createObjectURL(stream)})
        }
        peer.on('signal', (data) => {
            if (data.type && data.sdp) {
                if (this.props.inCalling || this.props.callingInYou) {
                    this.props.calling({
                        access: true,
                        type: 'signal',
                        userId: this.user.id,
                        messageType: messageType,
                        toId: userId,
                        callId: this.props.liveCallId,
                        data: {type: data.type, sdp: data.sdp},
                        videoCall: this.props.videoCall
                    });
                    this.props.setCallUserId(userId);
                }
            }
        });

        peer.on('stream', (stream) => {
            try {
                this.props.setUserVideo({srcObject: stream})
            } catch (e) {
                this.props.setUserVideo({src: URL.createObjectURL(stream)})
            }
        });

        peer.on('close', () => {
            let peer = this.peers[userId];
            if (peer !== undefined) {
                peer.destroy();
            }
            this.peers[userId] = undefined;
            this.props.setDefaultMessengerState()

        });

        return peer;
    };

    callTo = async (userId) => {
        this.peers[userId] = await this.startPeer(userId, 'call');
        //this.setPeer(this.peers[userId])
    };


    getOnlineUsers = (data) => {
        this.props.getOnlineUsers(data)
    };

    addOnlineUsers = (data) => {
        const {user, getRoomOnlineUsers, activeRoomId, addOnlineUsers} = this.props;
        try {
            clearTimeout(this[`timeOut_${data.id}`]);
        } catch (e) {
        }

        if (data.id !== user.id) {
            const {onlineUsers} = this.props;
            let foundUser = null;
            onlineUsers.forEach((value) => {
                if (value.id === data.id) {
                    foundUser = data
                }
            });

            if (!foundUser) {
                onlineUsers.push(data)
            }

            addOnlineUsers(onlineUsers);
            getRoomOnlineUsers(activeRoomId);
        }
    };

    removeOnlineUsers = (data) => {
        const {onlineUsers, getRoomOnlineUsers, removeOnlineUsers, activeRoomId} = this.props;
        const filterOnlineUsers = onlineUsers.filter((value) => {
            return value.id === data.id ? false : true
        });
        this[`timeOut_${data.id}`] = setTimeout(() => {
            removeOnlineUsers(filterOnlineUsers);
            getRoomOnlineUsers(activeRoomId);
        }, 10000);


    };


    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <PrivateRouter exact path='/' component={Home}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path={'/webservices/user/:auth_type/:auth_key'} component={SingleAuth}/>
                        <PrivateRouter exact path='/home' component={Home}/>
                        <PrivateRouter exact path='/photo' component={Photo}/>
                        <PrivateRouter exact path='/video' component={Photo}/>
                        <PrivateRouter exact path='/forum' component={Forum}/>
                        <PrivateRouter exact path='/secure' component={Secure}/>
                        <PrivateRouter exact path={['/chat', '/chat/:roomName']} component={Chat}/>
                        <PrivateRouter exact path='/messenger' component={Messenger}/>
                        <Route component={Page404}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    onlineUsers: state.auth.onlineUsers,
    inCalling: state.messenger.inCalling,
    authSelectedUserId: state.messenger.selectedUserId,
    userVideo: state.messenger.userVideo,
    myVideo: state.messenger.myVideo,
    callingInYou: state.messenger.callingInYou,
    callDown: state.messenger.callDown,
    peer: state.messenger.peer,
    videoCall: state.messenger.videoCall,
    callUserId: state.messenger.callUserId,
    liveCallId: state.messenger.liveCallId,
    activeRoomId: state.chat.activeRoomId


});

const mapDispatchToProps = {
    getUserInfo,
    getOnlineUsers,
    addOnlineUsers,
    removeOnlineUsers,
    calling,
    call,
    callInYou,
    setMyVideo,
    setUserVideo,
    setPeer,
    giveCall,
    setDefaultMessengerState,
    setCallUserId,
    changeUserVideoAccess,
    sendMessage,
    downCall,
    setLiveCallId,
    newPost,
    newComment,
    removePost,
    addRoom,
    deleteRoom,
    newLike,
    addMessage,
    getRoomOnlineUsers,
    kickFromRoom,
    closeWindow
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;
