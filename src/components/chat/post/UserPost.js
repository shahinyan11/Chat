import React, {Component} from 'react';
import {
    changeActiveRoom,
    getPostReplys,
    getRoomPosts,
    getRooms,
    togglePostUserModal,
    editPost,
    replyTo
} from "../../../store/actions/chat";
import {imageDialogOpen} from "../../../store/actions";
import {connect} from "react-redux";
import {getAvatar, pastTime} from "../../../helpers/helper";
import UserModal from "../popups/UserModal";
import {ClipLoader} from "react-spinners";
import Tools from "./Tools";
import LikeProgress from "../LikeProgress";
import ImageTools from "./ImageTools";
// import PostReplys from "./PostReplys";
// import MakeComment from "./MakeComment";
// import {CSSTransition} from 'react-transition-group';
// import NewMessageNotification from "../../NewMessageNotification";
import {Badge} from "react-bootstrap";

class UserPost extends Component {

    constructor(props) {
        super(props);

        this.postedText = null;
        this.middleLink = null;
        this.state = {
            commentsShow: false
        }

    }

    componentDidMount() {
        const {post} = this.props;
        const {commentsShow} = this.state
        if (post.chat_post_reply && post.chat_post_reply.length > 0) {
            this.setState({
                commentsShow: !commentsShow
            })
        }
    }

    editPost =(e, id)=> {
        // let body = e.target.innerHTML.replace(/<[^>]*>?/gm, '\n').replace(/\&nbsp;/gm, ' ');
        let body = e.target.innerHTML.replace(/<[^>]*>?/gm, ' ').replace(/&nbsp;/gm, ' ');
        this.props.editPost({
            id,
            body
        })
    }

    handleClick = (e, postId) => {
        e.stopPropagation();
        this.props.togglePostUserModal(postId)
    };

    openDialog = (imgId) => {
        const {imageDialogOpen} = this.props;
        imageDialogOpen(true, imgId, 'chat')
    };

    // openReplys = (postId) => {
    //     const {
    //         // replyCurrentPage,
    //         // replyLastPage,
    //         replys,
    //         post
    //     } = this.props;
    //     const {commentsShow} = this.state;
    //     if (!commentsShow) {
    //         if (!replys[post.id] || replys[post.id].length < 1) {
    //             this.props.getPostReplys(postId)
    //         }
    //     }
    //     this.setState({
    //         commentsShow: !commentsShow
    //     })
    // };

    middleClick = (e, url) => {
        if (e.button === 1) {
            window.open(url, '_blank');
        }
    };

    showComments = () => {
        const {commentsShow} = this.state;
        this.setState({
            commentsShow: !commentsShow
        })
    };

    replyClick = (userId, userName, roomId) => {

        this.props.replyTo(userId, userName, roomId)
    };

    render() {
        const {
            // rooms,
            activeRoomId,
            userRole,
            // replyPages,
            modals,
            // replys,
            post,
            // replyCurrentPage,
            // replyLastPage
        } = this.props;
        // const loadMoreShow = replyCurrentPage !== replyLastPage && replys[post.id] && replys[post.id]
        const {postUserModal} = modals;
        const {chat_attachment} = post;
        // const {commentsShow} = this.state;
        const moderator = userRole === 'moderator' ? true : false

        return (
            <div className={'UserPost'} key={post.id}>
                {
                    moderator && post.report_count > 0 ?
                        <Badge className={'post_report'} variant="danger">{post.report_count}</Badge>
                        :null
                }
                <div className={'header'}>
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
                        <div>
                            <span>{post.user_info.screen_name}</span>
                            {
                                post.reply_to ?
                                    <>
                                        <img className={'replyIcon'} src="/images/icons/chat/reply.svg" alt=""/>
                                        <span className={'replyTo'}>{post.reply_to}</span>
                                    </>
                                    : null
                            }

                            <div className={'time'}>
                                {
                                    post.temporary ?
                                        <ClipLoader
                                            sizeUnit={"px"}
                                            size={20}
                                            color={'#123abc'}
                                            loading="true"
                                        />
                                        : pastTime(post.created_at)}
                            </div>

                        </div>
                        <div >
                            <div className={'reply pointer'}>
                                <div onClick={() => {
                                    this.replyClick(post.owner_id, post.user_info.screen_name, activeRoomId)
                                }
                                }>
                                    <img src="/images/icons/chat/reply.svg" alt=""/>
                                    Reply
                                </div>
                            </div>
                            <div className={'dots'}>
                                <Tools post={post} postedText={this.postedText}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'content'}>
                    <div className={'post_item'}>
                        {
                            post.body && post.body !== '' ?
                                <span
                                    onBlur={(e) => {
                                        this.editPost(e, post.id)
                                    }}
                                    className={'postedText'}
                                    ref={el => this.postedText = el}
                                    // readOnly={true}
                                    // rows={1}
                                >
                                    {post.body}
                                </span>
                                : null
                        }
                        <div className={'imagesContent'}>
                            {
                                chat_attachment && chat_attachment.length > 0 ?

                                    chat_attachment.map((attachment) => (
                                        <div key={attachment.id} className={'imageItem'}>
                                            {
                                                moderator && attachment.report_count > 0 ?
                                                    <Badge className={'attachment_report'} variant="danger">{attachment.report_count}</Badge>
                                                    :null
                                            }
                                            <img onClick={() => {
                                                this.openDialog(attachment.user_image.id)
                                            }}
                                                 className={'pointer'}
                                                 onMouseUp={(e) => {
                                                     this.middleClick(e, `${process.env.REACT_APP_BACKEND_URL}/uploads/${attachment.user_image.src}`)
                                                 }}
                                                 src={`${process.env.REACT_APP_BACKEND_URL + "/uploads/" + attachment.user_image.src.replace('.', '_1024_700.')}`}
                                                 alt=""
                                            />
                                            {
                                                !post.temporary ?
                                                    <div className={'bottom_bar'}>
                                                        <LikeProgress attachment={attachment}/>
                                                        {/*<LikeProgress post={post}/>*/}
                                                        <ImageTools attachment={attachment} post={post}/>
                                                    </div>
                                                    : null
                                            }

                                        </div>
                                    ))
                                    : null
                            }
                        </div>
                    </div>
                    {/*##### For Forum #####*/}
                    {/*<div className={'aboutPost'}>*/}
                    {/*    <LikeProgress post={post}/>*/}
                    {/*    <div className={'pointer ml-2'} onClick={this.showComments}>Comments</div>*/}

                    {/*</div>*/}

                    {/*<CSSTransition*/}
                    {/*    in={commentsShow}*/}
                    {/*    timeout={500}*/}
                    {/*    classNames="commentsTrans"*/}
                    {/*    unmountOnExit*/}
                    {/*>*/}
                    {/*    <PostReplys post={post}/>*/}
                    {/*</CSSTransition>*/}

                </div>
                {/*{*/}
                {/*    commentsShow ?*/}
                {/*        <MakeComment postId={post.id}/>*/}
                {/*        : null*/}
                {/*}*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
    user: state.auth.user,
    userRole: state.auth.userRole,
    replyToUser: state.chat.replyToUser,
    modals: state.chat.modals,
    replyCurrentPage: state.chat.replyCurrentPage,
    replyLastPage: state.chat.replyLastPage,
});

const mapDispatchToProps = {
    changeActiveRoom,
    getRooms,
    getRoomPosts,
    togglePostUserModal,
    imageDialogOpen,
    getPostReplys,
    editPost,
    replyTo
};

const UserPostContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserPost);


export default UserPostContainer;
