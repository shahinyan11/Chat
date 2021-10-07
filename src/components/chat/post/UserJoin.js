import React, {Component} from 'react';
import {
    changeActiveRoom,
    getPostReplys,
    getRoomPosts,
    getRooms,
    togglePostUserModal
} from "../../../store/actions/chat";
import {imageDialogOpen} from "../../../store/actions";
import {connect} from "react-redux";
import {getAvatar, pastTime} from "../../../helpers/helper";
import UserModal from "../popups/UserModal";
import {ClipLoader} from "react-spinners";
// import Tools from "./Tools";


class UserJoin extends Component {

    handleClick = (e, postId) => {
        e.stopPropagation();
        this.props.togglePostUserModal(postId)
    };

    render() {
        const { post, modals } = this.props;
        const {postUserModal} = modals;
        return (
            <div className={"UserJoin"}  key={post.id}>
                <div className={'header'}>
                    <div>
                        <div className={'leftSide'}>
                            <div className={'avatar'} onClick={(e) => {
                                this.handleClick(e, post.id)
                            }}>
                                <div className={'hover'}></div>
                                {getAvatar(post.user_info)}
                                {
                                    postUserModal.open && Number(postUserModal.id) === Number(post.id) ?
                                        <UserModal userData={post.user_info}/> : null
                                }
                            </div>
                            <div className={'triangle'}></div>
                        </div>
                        <div className={'author'}>
                            <span>{post.user_info.screen_name}</span>
                            <div className={'gender'}><b>{post.user_info.gender}</b></div>
                            <div className={'info'}>
                                {post.type === 'room_join' ? 'JOINED THE TOOM' : 'LEFT THE TOOM'}
                            </div>
                        </div>
                    </div>
                    <div className={'time'}>
                        {
                            post.temporary ?
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={20}
                                    color={'#123abc'}
                                    loading="true"
                                />
                                : pastTime(post.created_at)
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
    user: state.auth.user,
    modals: state.chat.modals,
});

const mapDispatchToProps = {
    changeActiveRoom,
    getRooms,
    getRoomPosts,
    togglePostUserModal,
    imageDialogOpen,
    getPostReplys
};

const UserJoinContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserJoin);


export default UserJoinContainer;