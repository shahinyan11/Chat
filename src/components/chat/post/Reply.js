import React, {Component} from 'react';
import Tools from "./Tools";
import {getAvatar} from "../../../helpers/helper";
import {toggleCommentUserModal} from "../../../store/actions/chat";
import {connect} from "react-redux";
import UserModal from "../popups/UserModal";

class Reply extends Component {

    handleClick = (e, commentId) => {
        e.stopPropagation();
        this.props.toggleCommentUserModal(commentId)
    }
    render() {

        const { modals, psotReply} = this.props;
        const {commentUserModal} = modals;
        return (
            <div className={'Reply'}>
                <div className={'header'}>
                    <div className={'avatar'} onClick={(e) => {
                        this.handleClick(e, psotReply.id)
                    }}>
                        <div className={'hover'}></div>
                        {getAvatar(psotReply.user)}
                        {
                            commentUserModal.open && Number(commentUserModal.id) === Number(psotReply.id) ?
                                <UserModal userData={psotReply.user}/> : null
                        }
                    </div>
                    <div className={'author'}>
                        <h6>{psotReply.user.screen_name}</h6>
                        {/*<div className={'time'}>{HoursAndMinutes(psotReply.created_at)}</div>*/}
                    </div>
                    {/*<div className={'reply pointer'}>*/}
                    {/*    <img src="/images/icons/chat/reply.svg" alt=""/>*/}
                    {/*    REPLY*/}
                    {/*</div>*/}
                    <div className={'dots'}>
                        <Tools postReply={psotReply} reply={true}/>
                    </div>
                </div>
                <div className={'content'}>
                    <div className={'post_item'}>
                        <span className={'replyText'}>{psotReply.body}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    modals: state.chat.modals
});

const mapDispatchToProps = {
    toggleCommentUserModal
};

const ReplyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Reply);


export default ReplyContainer;
