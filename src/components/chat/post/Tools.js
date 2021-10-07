import React, {Component} from 'react';
// import {changeActiveSubChild} from "../../../store/actions/menu";
import {
    report,
    togglePostReplyTool,
    togglePostTool,
    replyTo,
    removeComment,
    removePost,
} from "../../../store/actions/chat";
import {connect} from "react-redux";
import {
    //empty,
    spinner
} from "../../../helpers/helper";

class Tools extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reported: null
        }
    }

    componentWillMount() {
        const {postReply, post} = this.props;
        if(post){
            this.setState({
                reported: post.report
            })
        }else if(postReply){
            this.setState({
                reported: postReply.report
            })
        }
    }

    toggle = () => {
        const {postReply, togglePostReplyTool, togglePostTool, post} = this.props;
        if (postReply) {
            togglePostReplyTool(postReply.id)
        } else {
            togglePostTool(post.id)
        }
    };

    // replyClick = () => {
    //     const {replyTo, postReply} = this.props;
    //     replyTo(postReply['chat_post_id'], postReply.user['screen_name'])
    // };

    removeClick = () => {
        const {removeComment, postReply, activeRoomId, post, removePost} = this.props;
        if (postReply) {
            removeComment(
                postReply.id,
                activeRoomId,
                postReply['chat_post_id']
            )
        } else if (post) {
            // if (!empty(post.chat_post_reply)) {
            //     post.chat_post_reply.forEach(reply => {
            //         removeComment(
            //             reply.id,
            //             post.chat_room_id,
            //             post.id,
            //         )
            //     })
            // }
            removePost({post})
        }

    };

    reportClick = () => {
        const {postReply, report, activeRoomId, post} = this.props;
        const {reported} = this.state;
        if (postReply) {
            report(
                {
                    property_id: postReply.id,
                    property_type: 'chat_post_comment'
                },
                activeRoomId,
                postReply['chat_post_id'],
                postReply.id
            )
        } else if (post) {
            this.setState({
                reported: !reported
            })
            report(
                {
                    property_id: post.id,
                    property_type: 'chat_post'
                },
                activeRoomId,
                post.id,
            )
        }
    };

    editClick = () => {
        const el = this.props.postedText;
        el.setAttribute('contenteditable', 'true');
        const sel = window.getSelection();
        sel.collapse(el.firstChild, el.firstChild.length);
    };

    stopClickPropagation = (e) => {
        e.stopPropagation();
    };

    render() {
        const {postReply, modals, post, user, showSpinner, reply, userRole} = this.props;
        const {reported} = this.state;
        const isOwner = (postReply && Number(postReply.owner_id) === Number(user.id)) || (post && Number(post.owner_id) === Number(user.id))
        const replayOpen = postReply && Number(postReply.id) === Number(modals.postReplyTool.id) && modals.postReplyTool.open;
        const postOpen = post && Number(post.id) === Number(modals.postTool.id) && modals.postTool.open;
        const replayReported = reported !== null ? reported : postReply && postReply.report;
        const postReported = reported !== null ? reported :  post && post.report;
        const moderator = userRole === 'moderator' ? true : false
        const icon = isOwner || moderator ? 'delete.svg' : replayReported || postReported ? 'flag_red.svg' : 'flag.svg'
        return (
            <ul className={`Tools ${replayOpen || postOpen ? 'open' : ''}`} onClick={this.stopClickPropagation}>
                {
                    replayOpen || postOpen ?
                        <>

                            {
                                postReply && !isOwner ?
                                    <li onClick={this.replyClick}>
                                        <img className={'pointer'} src={`/images/icons/chat/forum.svg`} alt=""/>
                                    </li>
                                    : null
                            }
                            {
                                (isOwner || moderator) && !reply && post.body ?
                                    <li className={'order'} onClick={this.editClick}>
                                        <img className={'pointer order'} src={`/images/icons/chat/edit.svg`}
                                             alt=""/>
                                    </li>
                                    :null

                            }

                            <li className={'order'} onClick={isOwner || moderator ? this.removeClick : this.reportClick}>
                                <img className={'pointer order'} src={`/images/icons/chat/${icon}`} alt=""/>
                            </li>
                        </>
                        : null
                }
                <li onClick={this.toggle} className={'pointer'}>
                    <img src={`/images/icons/chat/dots.svg`} alt=""/>
                </li>
                {
                    replayOpen || postOpen ? spinner(showSpinner) : null
                }
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    modals: state.chat.modals,
    rooms: state.chat.rooms,
    user: state.auth.user,
    userRole: state.auth.userRole,
    showSpinner: state.chat.showSpinner,
});

const mapDispatchToProps = {
    report,
    togglePostReplyTool,
    togglePostTool,
    replyTo,
    removeComment,
    removePost,
};

const ToolsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tools);

export default ToolsContainer;
