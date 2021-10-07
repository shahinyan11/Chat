import React, {Component} from 'react';
import MediaHandler from '../MediaHandler';
import Pusher from 'pusher-js';
import Peer from 'simple-peer';
import {addOnlineUsers, getUserInfo, removeOnlineUsers, getOnlineUsers} from "../store/actions/auth";
import {call, calling,   callInYou,} from "../store/actions/messenger";
import {connect} from "react-redux";


const APP_KEY = '0d6bc1e0cf080402b536';

class Test extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasMedia: false,
            otherUserId: null
        };

        this.user = {};

        this.user.stream = null;
        this.peers = {};

        this.mediaHandler = new MediaHandler();


        this.callTo = this.callTo.bind(this);
        this.setupPusher = this.setupPusher.bind(this);
        this.UNSAFE_componentWillMount = this.UNSAFE_componentWillMount.bind(this);
        this.startPeer = this.startPeer.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {user} = nextProps;
        this.user = user;

        if(this.props.user !== nextProps.user && user) {
            this.setupPusher();
            this.mediaHandler.getPermissions()
                .then((stream) => {
                    this.setState({hasMedia: true});
                    this.user.stream = stream;

                    try {
                        this.myVideo.srcObject = stream;
                    } catch (e) {
                        this.myVideo.src = URL.createObjectURL(stream);
                    }

                    this.myVideo.play();
                })
        }
        return true
    }

    UNSAFE_componentWillMount() {
        this.props.getUserInfo();

    }

    setupPusher() {
        this.pusher = new Pusher(APP_KEY, {
            authEndpoint: '/pusher/auth',
            cluster: 'ap2',
            auth: {
                params: this.user.id,
                headers: {
                    'X-CSRF-Token': window.csrfToken
                }
            }
        });
        this.channel = this.pusher.subscribe('presence-video-channel');

        this.channel.bind(`client-signal-${this.user.id}`, (signal) => {
            let peer = this.peers[signal.userId];
            // if peer is not already exists, we got an incoming call
            if(peer === undefined) {
                this.setState({otherUserId: signal.userId});
                peer = this.startPeer(signal.userId, false);
            }

            peer.signal(signal.data);
        });
    }

    startPeer(userId, initiator = true) {
        const peer = new Peer({
            initiator,
            stream: this.user.stream,
            trickle: false
        });

        peer.on('signal', (data) => {
            this.channel.trigger(`client-signal-${userId}`, {
                type: 'signal',
                userId: this.user.id,
                data: data
            });
        });

        peer.on('stream', (stream) => {
            try {
                this.userVideo.srcObject = stream;
            } catch (e) {
                this.userVideo.src = URL.createObjectURL(stream);
            }

            this.userVideo.play();
        });

        peer.on('close', () => {
            let peer = this.peers[userId];
            if(peer !== undefined) {
                peer.destroy();
            }

            this.peers[userId] = undefined;
        });

        return peer;
    }

    callTo(userId) {
        this.peers[userId] = this.startPeer(userId);
    }

    render() {
        return (
            <div className="App">

                {this.user.id ?
                    ['5cff46b5156db908340014bc','5cff46b5156db908340014bd'].map((userId) => {
                    return this.user.id !== userId ? <button key={userId} onClick={() => this.callTo(userId)}>Call {userId}</button> : null;
                })
                    :
                    null}

                <div className="video-container">
                    <video className="my-video" ref={(ref) => {this.myVideo = ref;}}></video>
                    <video className="user-video" ref={(ref) => {this.userVideo = ref;}}></video>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user : state.auth.user,
});

const mapDispatchToProps = {
    getUserInfo,
    getOnlineUsers,
    addOnlineUsers,
    removeOnlineUsers,
    calling,
    call,
    callInYou,
};

const TestContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Test);

export default TestContainer;
