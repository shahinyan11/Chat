import React, {Component} from 'react';
import MediaHandler from "../MediaHandler"
// import Pusher from 'pusher-js';
import Peer from 'simple-peer';
import {connect} from "react-redux";
import {calling} from "../store/actions/messenger"

const APP_KEY = '0d6bc1e0cf080402b536';

class VideoChat extends Component {

    constructor() {
        super();

        this.state = {
            hasMedia: false,
            otherUserId: null
        };

        this.user = window.user;
        this.user.stream = null;
        this.peers = {};

        this.mediaHandler = new MediaHandler();
        this.setupPusher();
    }

    UNSAFE_componentWillMount() {
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

    setupPusher = () => {

        Echo.channel('privatechat.' + window.user.id)
            .listen('PrivateMessageSent',(e)=>{
                let signal = e.message;

                let peer = this.peers[signal.userId];

                // if peer is not already exists, we got an incoming call
                if(peer === undefined) {
                    this.setState({otherUserId: signal.userId});
                    peer = this.startPeer(signal.userId, false);
                }

                let res = {type: signal.data.type, sdp:JSON.parse(signal.data.sdp)};
                 peer.signal(res);
               // let sdp = "v=0\no=- 619106263705201290 2 IN IP4 127.0.0.1\ns=-\nt=0 0\na=group:BUNDLE 0 1 2\na=msid-semantic: WMS cHd1I541sAUHjZRhkwqhpZMfal7wm91Jughe\nm=audio 11272 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126\nc=IN IP4 46.71.10.74\na=rtcp:9 IN IP4 0.0.0.0\na=candidate:3988902457 1 udp 2122260223 192.168.0.11 61835 typ host generation 0 network-id 1\na=candidate:1958211684 1 udp 2122194687 192.168.121.1 61836 typ host generation 0 network-id 2\na=candidate:3857564762 1 udp 2122129151 192.168.49.1 61837 typ host generation 0 network-id 3\na=candidate:466725869 1 udp 1686052607 46.71.10.74 11272 typ srflx raddr 192.168.0.11 rport 61835 generation 0 network-id 1\na=candidate:2739023561 1 tcp 1518280447 192.168.0.11 9 typ host tcptype active generation 0 network-id 1\na=candidate:976489620 1 tcp 1518214911 192.168.121.1 9 typ host tcptype active generation 0 network-id 2\na=candidate:2876127402 1 tcp 1518149375 192.168.49.1 9 typ host tcptype active generation 0 network-id 3\na=ice-ufrag:CRZA\na=ice-pwd:CPugGY8iwDun29aCuxX1602j\na=fingerprint:sha-256 DD:E8:04:80:0D:EB:A1:95:3C:B5:91:4C:65:77:34:33:F4:71:AA:57:CE:BF:E2:0E:12:14:77:BF:EE:C2:F3:AA\na=setup:actpass\na=mid:0\na=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\na=extmap:2 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\na=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\na=extmap:4 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\na=extmap:5 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id\na=sendrecv\na=msid:cHd1I541sAUHjZRhkwqhpZMfal7wm91Jughe 2423219e-3872-4ddd-916a-9fe9a4a0da95\na=rtcp-mux\na=rtpmap:111 opus/48000/2\na=rtcp-fb:111 transport-cc\na=fmtp:111 minptime=10;useinbandfec=1\na=rtpmap:103 ISAC/16000\na=rtpmap:104 ISAC/32000\na=rtpmap:9 G722/8000\na=rtpmap:0 PCMU/8000\na=rtpmap:8 PCMA/8000\na=rtpmap:106 CN/32000\na=rtpmap:105 CN/16000\na=rtpmap:13 CN/8000\na=rtpmap:110 telephone-event/48000\na=rtpmap:112 telephone-event/32000\na=rtpmap:113 telephone-event/16000\na=rtpmap:126 telephone-event/8000\na=ssrc:2511153079 cname:yLd7ZiFSdCBTAhjY\na=ssrc:2511153079 msid:cHd1I541sAUHjZRhkwqhpZMfal7wm91Jughe 2423219e-3872-4ddd-916a-9fe9a4a0da95\na=ssrc:2511153079 mslabel:cHd1I541sAUHjZRhkwqhpZMfal7wm91Jughe\na=ssrc:2511153079 label:2423219e-3872-4ddd-916a-9fe9a4a0da95\nm=video 11273 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 122 127 121 125 107 108 109 124 120 123 119 114 115 116\nc=IN IP4 46.71.10.74\na=rtcp:9 IN IP4 0.0.0.0\na=candidate:3988902457 1 udp 2122260223 192.168.0.11 61838 typ host generation 0 network-id 1\na=candidate:1958211684 1 udp 2122194687 192.168.121.1 61839 typ host generation 0 network-id 2\na=candidate:3857564762 1 udp 2122129151 192.168.49.1 61840 typ host generation 0 network-id 3\na=candidate:466725869 1 udp 1686052607 46.71.10.74 11273 typ srflx raddr 192.168.0.11 rport 61838 generation 0 network-id 1\na=candidate:2739023561 1 tcp 1518280447 192.168.0.11 9 typ host tcptype active generation 0 network-id 1\na=candidate:976489620 1 tcp 1518214911 192.168.121.1 9 typ host tcptype active generation 0 network-id 2\na=candidate:2876127402 1 tcp 1518149375 192.168.49.1 9 typ host tcptype active generation 0 network-id 3\na=ice-ufrag:CRZA\na=ice-pwd:CPugGY8iwDun29aCuxX1602j\na=fingerprint:sha-256 DD:E8:04:80:0D:EB:A1:95:3C:B5:91:4C:65:77:34:33:F4:71:AA:57:CE:BF:E2:0E:12:14:77:BF:EE:C2:F3:AA\na=setup:actpass\na=mid:1\na=extmap:14 urn:ietf:params:rtp-hdrext:toffset\na=extmap:13 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\na=extmap:12 urn:3gpp:video-orientation\na=extmap:2 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\na=extmap:11 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\na=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type\na=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-timing\na=extmap:8 http://tools.ietf.org/html/draft-ietf-avtext-framemarking-07\na=extmap:9 http://www.webrtc.org/experiments/rtp-hdrext/color-space\na=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\na=extmap:4 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\na=extmap:5 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id\na=sendrecv\na=msid:cHd1I541sAUHjZRhkwqhpZMfal7wm91Jughe f6988245-71ec-4525-89fe-fc3a31d09f01\na=rtcp-mux\na=rtcp-rsize\na=rtpmap:96 VP8/90000\na=rtcp-fb:96 goog-remb\na=rtcp-fb:96 transport-cc\na=rtcp-fb:96 ccm fir\na=rtcp-fb:96 nack\na=rtcp-fb:96 nack pli\na=rtpmap:97 rtx/90000\na=fmtp:97 apt=96\na=rtpmap:98 VP9/90000\na=rtcp-fb:98 goog-remb\na=rtcp-fb:98 transport-cc\na=rtcp-fb:98 ccm fir\na=rtcp-fb:98 nack\na=rtcp-fb:98 nack pli\na=fmtp:98 profile-id=0\na=rtpmap:99 rtx/90000\na=fmtp:99 apt=98\na=rtpmap:100 VP9/90000\na=rtcp-fb:100 goog-remb\na=rtcp-fb:100 transport-cc\na=rtcp-fb:100 ccm fir\na=rtcp-fb:100 nack\na=rtcp-fb:100 nack pli\na=fmtp:100 profile-id=2\na=rtpmap:101 rtx/90000\na=fmtp:101 apt=100\na=rtpmap:102 H264/90000\na=rtcp-fb:102 goog-remb\na=rtcp-fb:102 transport-cc\na=rtcp-fb:102 ccm fir\na=rtcp-fb:102 nack\na=rtcp-fb:102 nack pli\na=fmtp:102 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f\na=rtpmap:122 rtx/90000\na=fmtp:122 apt=102\na=rtpmap:127 H264/90000\na=rtcp-fb:127 goog-remb\na=rtcp-fb:127 transport-cc\na=rtcp-fb:127 ccm fir\na=rtcp-fb:127 nack\na=rtcp-fb:127 nack pli\na=fmtp:127 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f\na=rtpmap:121 rtx/90000\na=fmtp:121 apt=127\na=rtpmap:125 H264/90000\na=rtcp-fb:125 goog-remb\na=rtcp-fb:125 transport-cc\na=rtcp-fb:125 ccm fir\na=rtcp-fb:125 nack\na=rtcp-fb:125 nack pli\na=fmtp:125 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\na=rtpmap:107 rtx/90000\na=fmtp:107 apt=125\na=rtpmap:108 H264/90000\na=rtcp-fb:108 goog-remb\na=rtcp-fb:108 transport-cc\na=rtcp-fb:108 ccm fir\na=rtcp-fb:108 nack\na=rtcp-fb:108 nack pli\na=fmtp:108 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f\na=rtpmap:109 rtx/90000\na=fmtp:109 apt=108\na=rtpmap:124 H264/90000\na=rtcp-fb:124 goog-remb\na=rtcp-fb:124 transport-cc\na=rtcp-fb:124 ccm fir\na=rtcp-fb:124 nack\na=rtcp-fb:124 nack pli\na=fmtp:124 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d0032\na=rtpmap:120 rtx/90000\na=fmtp:120 apt=124\na=rtpmap:123 H264/90000\na=rtcp-fb:123 goog-remb\na=rtcp-fb:123 transport-cc\na=rtcp-fb:123 ccm fir\na=rtcp-fb:123 nack\na=rtcp-fb:123 nack pli\na=fmtp:123 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640032\na=rtpmap:119 rtx/90000\na=fmtp:119 apt=123\na=rtpmap:114 red/90000\na=rtpmap:115 rtx/90000\na=fmtp:115 apt=114\na=rtpmap:116 ulpfec/90000\na=ssrc-group:FID 3556640552 1354871533\na=ssrc:3556640552 cname:yLd7ZiFSdCBTAhjY\na=ssrc:3556640552 msid:cHd1I541sAUHjZRhkwqhpZMfal7wm91Jughe f6988245-71ec-4525-89fe-fc3a31d09f01\na=ssrc:3556640552 mslabel:cHd1I541sAUHjZRhkwqhpZMfal7wm91Jughe\na=ssrc:3556640552 label:f6988245-71ec-4525-89fe-fc3a31d09f01\na=ssrc:1354871533 cname:yLd7ZiFSdCBTAhjY\na=ssrc:1354871533 msid:cHd1I541sAUHjZRhkwqhpZMfal7wm91Jughe f6988245-71ec-4525-89fe-fc3a31d09f01\na=ssrc:1354871533 mslabel:cHd1I541sAUHjZRhkwqhpZMfal7wm91Jughe\na=ssrc:1354871533 label:f6988245-71ec-4525-89fe-fc3a31d09f01\nm=application 11274 DTLS/SCTP 5000\nc=IN IP4 46.71.10.74\na=candidate:3988902457 1 udp 2122260223 192.168.0.11 61841 typ host generation 0 network-id 1\na=candidate:1958211684 1 udp 2122194687 192.168.121.1 61842 typ host generation 0 network-id 2\na=candidate:3857564762 1 udp 2122129151 192.168.49.1 61843 typ host generation 0 network-id 3\na=candidate:466725869 1 udp 1686052607 46.71.10.74 11274 typ srflx raddr 192.168.0.11 rport 61841 generation 0 network-id 1\na=candidate:2739023561 1 tcp 1518280447 192.168.0.11 9 typ host tcptype active generation 0 network-id 1\na=candidate:976489620 1 tcp 1518214911 192.168.121.1 9 typ host tcptype active generation 0 network-id 2\na=candidate:2876127402 1 tcp 1518149375 192.168.49.1 9 typ host tcptype active generation 0 network-id 3\na=ice-ufrag:CRZA\na=ice-pwd:CPugGY8iwDun29aCuxX1602j\na=fingerprint:sha-256 DD:E8:04:80:0D:EB:A1:95:3C:B5:91:4C:65:77:34:33:F4:71:AA:57:CE:BF:E2:0E:12:14:77:BF:EE:C2:F3:AA\na=setup:actpass\na=mid:2\na=sctpmap:5000 webrtc-datachannel 1024\n";
                //peer.signal({type: "offer", sdp:sdp});
            })

    }

    startPeer = (userId, initiator = true) => {
        const peer = new Peer({
            initiator,
            stream: this.user.stream,
            trickle: false
        });

        peer.on('signal', (data) => {
             this.props.calling(
            {
                type: 'signal',
                userId: userId,
                data: {type: data.type, sdp:JSON.stringify(data.sdp)}
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

    callTo = (userId) => {
        this.peers[userId] = this.startPeer(userId);
    }

    render() {
        return (
            <div className="App">
                {['5cf66690a6d7653580002e2e'].map((userId) => {
                    return this.user.id !== userId ? <button key={userId} onClick={() => this.callTo(userId)}>Call {userId}</button> : null;
                })}

                <div className="video-container">
                    <video className="my-video" ref={(ref) => {this.myVideo = ref;}}></video>
                    <video className="user-video" ref={(ref) => {this.userVideo = ref;}}></video>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    calling
};

const VideoChatContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(VideoChat);

export default VideoChatContainer;
