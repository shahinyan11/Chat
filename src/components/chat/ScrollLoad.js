import React, {Component} from 'react';
import {
    changeActiveRoom,
    getRoomPosts,
    getRooms,
    togglePostUserModal,
    setRequestAccess
} from "../../store/actions/chat";
import {connect} from "react-redux";
import Posts from './post/Posts';
import MakePost from "./post/MakePost";
import {ClipLoader} from 'react-spinners';
import {getActiveRoom} from "../../helpers/helper"

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
        const { activeRoomId, rooms, postsCurrentPage } = this.props;

        if (activeRoomId !== nextProps.activeRoomId) {
            this.addRoomPosts(nextProps);
        }

        if(activeRoomId !== nextProps.activeRoomId || rooms !== nextProps.rooms){
            this.setState({
                loading: false,
            });
        }

        if( activeRoomId === nextProps.activeRoomId && postsCurrentPage !== nextProps.postsCurrentPage ){
            this.scrollHeight = this.iScroll.scrollHeight
        }
        return true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const{scrollOnBottom} = this.state;
        const{activeRoomId, rooms, postsCurrentPage, scrollControl} = this.props
        if(scrollOnBottom && scrollOnBottom !== prevState.scrollOnBottom){
            this.iScroll.scrollTop = this.iScroll.scrollHeight
        }

        if(activeRoomId !== prevProps.activeRoomId && rooms !== prevProps.rooms){
            const room = getActiveRoom(rooms, activeRoomId);
            const remmemberPosition = room && 'rememberPosition' in room ? room.rememberPosition : null;
            this.iScroll.scrollTop = remmemberPosition !== null ? remmemberPosition : this.iScroll.scrollHeight - this.scrollHeight
        }
        if(activeRoomId === prevProps.activeRoomId && postsCurrentPage !== prevProps.postsCurrentPage ){

            this.iScroll.scrollTop = this.iScroll.scrollHeight - this.scrollHeight
        }
        if(activeRoomId === prevProps.activeRoomId && scrollControl !== prevProps.scrollControl){
            this.iScroll.scrollTop = this.iScroll.scrollHeight;
        }
    }

    componentDidMount() {
        const {requestAccess, setRequestAccess} = this.props;
        this.iScroll.addEventListener("scroll", () => {
            const {iScroll} = this;
            if (iScroll.scrollTop <= 0 && iScroll.scrollHeight > iScroll.clientHeight && requestAccess) {
                setRequestAccess(false);
                this.loadMoreItems();
            }
        });
        this.setState({
            scrollOnBottom: true
        })
    }

    loadMoreItems = () => {
        const {activeRoomId, postsCurrentPage, postsLastPage} = this.props;
        if (postsLastPage !== postsCurrentPage) {
            this.setState({
                loading: true
            });
            setTimeout(() => {
                this.props.getRoomPosts(activeRoomId, postsCurrentPage + 1)
            }, 1000)

        }
    }

    addRoomPosts = (data) => {
        const {rooms, activeRoomId} = data;
        if (rooms.length > 0) {
            const room = rooms.filter((value) => {
                return Number(value.id) === Number(activeRoomId) ? true : false
            })[0];
            if (room && !room.posts) {
                this.props.getRoomPosts(activeRoomId)
            }
        }
    };

    render() {
        const { rooms, activeRoomId} = this.props;
        let posts = [];
        const room = getActiveRoom(rooms, activeRoomId);
        posts = room && room.posts ? room.posts : [];

        return (
            <>
                <div className='sweet-loading'>
                    <ClipLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
                <div
                    ref={(el) => {this.iScroll = el}}
                    id={"Posts"}
                    className={'Posts'}

                >
                    <div ref={(el) => {this.scrollContent = el}}>
                        {
                            posts.map((value) => (
                                <Posts key={value.id} post={value}/>
                            ))
                        }
                    </div>
                </div>
                <MakePost
                    scrollElem={this.iScroll}
                    scrollContent={this.scrollContent}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
    user: state.auth.user,
    replyTo: state.chat.replyTo,
    modals: state.chat.modals,
    postsCurrentPage: state.chat.postsCurrentPage,
    postsLastPage: state.chat.postsLastPage,
    requestAccess: state.chat.requestAccess,

});

const mapDispatchToProps = {
    changeActiveRoom,
    getRooms,
    getRoomPosts,
    togglePostUserModal,
    setRequestAccess
};

const ScrollLoadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScrollLoad);

export default ScrollLoadContainer;
