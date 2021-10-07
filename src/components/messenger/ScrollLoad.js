import React, {Component} from 'react';
import {
    changeActiveRoom,
    getRoomPosts,
    getRooms,
    togglePostUserModal,
    setRequestAccess
} from "../../store/actions/chat";
import {connect} from "react-redux";
import {ClipLoader} from 'react-spinners';
import CallMessage from "./CallMessage";
import TextMessage from "./TextMessage";
import MakeMessage from "./MakeMessage";
import CallBarTop from "./CallBarTop"
import { selectUser, call } from '../../store/actions/messenger';

class ScrollLoad extends Component {

    constructor(props) {
        super(props);

        this.iScroll = null;
        this.scrollContent = null;
        this.scrollHeight = 0;

        this.state = {
            loading: false,
            items: 10,
            scrollOnBottom: false
        }
    }

    UNSAFE_componentWillMount() {
        this.addRoomPosts(this.props)
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { selectedUserId, userMessages } = this.props;
        // if (activeRoomId !== nextProps.activeRoomId) {
        //     this.addRoomPosts(nextProps);
        // }

        // if(activeRoomId !== nextProps.activeRoomId || rooms !== nextProps.rooms){
        //
        //     this.setState({
        //         loading: false,
        //     });
        //
        // }
        if( selectedUserId === nextProps.selectedUserId ){
            this.scrollHeight = this.iScroll.scrollHeight
        }
        return true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const{scrollOnBottom} = this.state;
        const{selectedUserId, userMessages,scrollControl} = this.props
        if(selectedUserId === prevProps.selectedUserId && userMessages !== prevProps.userMessages ){
            this.iScroll.scrollTop = this.iScroll.scrollHeight - this.scrollHeight
        }
        if(selectedUserId === prevProps.selectedUserId && scrollControl !== prevProps.scrollControl){
            this.iScroll.scrollTop = this.iScroll.scrollHeight;
        }
    }

    componentDidMount() {
        // const {requestAccess, setRequestAccess} = this.props;
        // this.iScroll.addEventListener("scroll", () => {
        //     const {iScroll} = this;
        //     if (iScroll.scrollTop <= 0 && iScroll.scrollHeight > iScroll.clientHeight && requestAccess) {
        //         setRequestAccess(false);
        //         this.loadMoreItems();
        //     }
        // });
        // this.setState({
        //     scrollOnBottom: true
        // })
    }

    loadMoreItems = () => {
        // const {selectedUserId } = this.props;
        // if (postsLastPage !== postsCurrentPage) {
        //     this.setState({
        //         loading: true
        //     });
        //     setTimeout(() => {
        //         this.props.getRoomPosts(activeRoomId, postsCurrentPage + 1)
        //     }, 1000)
        //
        // }
    }

    addRoomPosts = (data) => {
        // const {rooms, activeRoomId} = data;
        // if (rooms.length > 0) {
        //     const room = rooms.filter((value) => {
        //         return Number(value.id) === Number(activeRoomId) ? true : false
        //     })[0];
        //     if (room && !room.posts) {
        //         this.props.getRoomPosts(activeRoomId)
        //     }
        // }
    };

    getActiveRoom = () => {
        // const {rooms, activeRoomId} = this.props;
        // if (rooms.length > 0) {
        //     const room = rooms.filter((value) => {
        //         return Number(value.id) === Number(activeRoomId) ? true : false
        //     })[0]
        //
        //     return room
        // } else {
        //     return null
        // }
    }

    render() {
        const {user, userMessages, onlineUsers, selectedUserId} = this.props;
        const selectedUser = onlineUsers.filter(user=> {
            if(Number(user.id) === Number(selectedUserId)){
                return user;
            }
        });
        return (
            <>
                {
                    selectedUser.length && <CallBarTop />
                }
                <div className='sweet-loading'>
                    <ClipLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
                <div
                    className={'message_bord'}
                    id={"Messages"}
                    ref={(el) => {this.iScroll = el}}
                >
                    <div ref={(el) => {this.scrollContent = el}}>
                        {
                            userMessages.map((value, index) => (
                                <div key={index}
                                     className={`message_item ${value.call_id ? 'center' : value.author_id === user.id ? 'right' : 'left'}`}
                                >
                                    {
                                        value.call_id  && value.call ?

                                            <CallMessage data={value}/>
                                            :
                                            <div>
                                                <TextMessage data={value}/>
                                            </div>
                                    }
                                </div>
                            ))
                        }
                    </div>

                </div>
                <MakeMessage/>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    userMessages: state.messenger.userMessages,
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
    replyTo: state.chat.replyTo,
    modals: state.chat.modals,
    postsCurrentPage: state.chat.postsCurrentPage,
    postsLastPage: state.chat.postsLastPage,
    requestAccess: state.chat.requestAccess,
    selectedUserId: state.messenger.selectedUserId,
    scrollControl: state.messenger.scrollControl,
    onlineUsers: state.auth.onlineUsers,
});

const mapDispatchToProps = {
    changeActiveRoom,
    getRooms,
    getRoomPosts,
    togglePostUserModal,
    setRequestAccess,
    call
};

const ScrollLoadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScrollLoad);

export default ScrollLoadContainer;
