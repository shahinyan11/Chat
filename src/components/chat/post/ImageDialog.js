import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap'
// import SendMessage from "../popups/SendMessage";
import {
    report,
    removeAttachment,
    togglePostUserModal,
    getPostReplys,
    downloadImage,
    removePost
} from "../../../store/actions/chat";
import {imageDialogOpen, MessangerImageDialogOpen} from "../../../store/actions/index";
import {connect} from "react-redux";
import {getAvatar} from "../../../helpers/helper";
// import {Link} from 'react-router-dom'
// import ImageTools from "./ImageTools";
// import Reply from "./Reply";
// import MakeComment from "./MakeComment";
import UserModal from "../popups/UserModal";
// import PostReplys from "./PostReplys";


class ImageDialog extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);

        this.state = {
            dotsSelected: false,
            index: 0,
            rotate: 0,
            commentsShow: false,
            reported: null,
        };
    }

    UNSAFE_componentWillMount() {
        let {chatPhotos, imgId, activeRoomId} = this.props;
        const {photos} = chatPhotos[activeRoomId] ? chatPhotos[activeRoomId] : {photos: {}};
        const arrayPhotos = Object.values(photos);
        arrayPhotos.forEach((value, index) => {
            if (Number(value.user_image.id) === Number(imgId)) {
                this.setState({
                    index
                })
            }
        })
    }

    arrowLeft = () => {
        const {index} = this.state;
        const newIndex = index > 0 ? index - 1 : index;
        this.setState({
            index: newIndex,
            rotate: 0
        })
    };

    toggle = () => {
        const {dotsSelected} = this.state;
        this.setState({
            dotsSelected: !dotsSelected
        })
    };

    arrowRight = () => {
        const {index} = this.state;
        let {chatPhotos, activeRoomId} = this.props;
        const {photos} = chatPhotos[activeRoomId] ? chatPhotos[activeRoomId] : {photos: {}};
        const arrayPhotos = Object.values(photos);
        const newIndex = index < arrayPhotos.length - 1 ? index + 1 : index;
        this.setState({
            index: newIndex,
            rotate: 0
        })
    };

    rotateImg = () => {
        const {rotate} = this.state;
        this.setState({
            rotate: rotate + 90
        })
    };

    close = () => {
        this.props.imageDialogOpen(false)
    };

    removeClick = () => {
        let {removeAttachment, chatPhotos, activeRoomId, removePost} = this.props;
        const {index} = this.state;
        const {photos} = chatPhotos[activeRoomId] ? chatPhotos[activeRoomId] : {photos: {}};
        const arrayPhotos = Object.values(photos);
        const roomId = arrayPhotos[index].chat_room_id;
        const postId = arrayPhotos[index].chat_post_id;
        const attachmentId = arrayPhotos[index].id;
        const post = this.getPost( roomId, postId );
        if(post.chat_attachment.length < 2){

            removePost({post})
        }else{
            removeAttachment(
                roomId,
                postId,
                attachmentId
            )
        }

    };

    reportClick = () => {
        let {report, chatPhotos, activeRoomId} = this.props;
        const {photos} = chatPhotos[activeRoomId] ? chatPhotos[activeRoomId] : {photos: {}};
        const arrayPhotos = Object.values(photos);
        const {index, reported} = this.state;
        this.setState({
            reported: !reported
        })
        report(
            {
                property_id: arrayPhotos[index].id,
                property_type: 'chat_attachment'
            },
            arrayPhotos[index].chat_room_id,
            arrayPhotos[index].chat_post_id,
            null,
            arrayPhotos[index].id
        )
    };

    getPost = (roomId, postId) => {
        const {rooms} = this.props;
        let post = null;
        rooms.forEach((room) => {
            if (room.posts) {
                room.posts.forEach((value) => {
                    if (value.id === postId) {
                        post = value
                    }
                })
            }
        });

        return post
    };


    openReplys = (postId) => {
        const {commentsShow} = this.state;
        const {replys} = this.props;
        if(!commentsShow){
            if(!replys[postId] || replys[postId].length < 1) {
                this.props.getPostReplys(postId)
            }
        }
        this.setState({
            commentsShow: !commentsShow
        })

    };

    // loadMore = (postId) => {
    //     const {replyCurrentPage, replyLastPage} = this.props;
    //     if (replyCurrentPage !== replyLastPage || (!replyCurrentPage && !replyLastPage)) {
    //         this.props.getPostReplys(postId, replyCurrentPage + 1)
    //     }
    // }

    toggleShowComments = () => {
        const {commentsShow} = this.state;
        this.setState({
            commentsShow: !commentsShow
        })
    };

    avatarClick = (e, postId) => {
        e.stopPropagation();
        this.props.togglePostUserModal(postId)
    };

    download(image){
        this.props.downloadImage(image)

    }

    render() {
        let {onlineUsers, 
            selectedUserId,
            chatPhotos,                                                                                             
            user,
            modals,
            imageDialogPage,
            activeRoomId,
            userRole,
            userMessages
        } = this.props;
        
        var mesangerImg = null;
        const messangerImage = userMessages.map((value, index) => {
            value.message_attachment.map((attachment) => {
                if (attachment.type === 'image') {
                    mesangerImg = attachment.user_image;
                }
            });
        })
        const finalImages = messangerImage ? messangerImage : null;
        const {index, rotate, dotsSelected, commentsShow, reported} = this.state;
        const {photos} = chatPhotos[activeRoomId] ? chatPhotos[activeRoomId] : {photos: {}};
        const arrayPhotos = Object.values(photos);
        const {postUserModal} = modals;
        const foundPost = imageDialogPage === 'chat' && arrayPhotos[index] ? arrayPhotos[index].chat_post : [];
        const rotated = rotate / 90 % 2 > 0 ? true : false;
        const isOwner = arrayPhotos[index] && (Number(arrayPhotos[index].user_image.owner_id) === Number(user.id));
        const moderator = userRole === 'moderator' ? true : false

        const imageReported = reported !== null ? reported : arrayPhotos[index] && arrayPhotos[index].report;
        const icon = isOwner || moderator ? 'delete.svg' : imageReported ? 'flag_red.svg' : 'flag.svg';
        const userModalOpen = postUserModal.open && Number(postUserModal.id) === Number(foundPost.id) ? true : false;
        

        const selectedUser = onlineUsers.filter(user=> {
            if(Number(user.id) === Number(selectedUserId)){
                return user;
            }
        })[0];
       

        return (
            <>
                {
                    arrayPhotos[index] &&  imageDialogPage === 'chat'?
                        <Modal.Dialog className={'imageDialog'}>
                            <img className={'close'} onClick={this.close} src="/images/icons/close.svg" alt=""/>
                            <Modal.Body >
                                <div className={`content ${commentsShow ? 'commentShow' : ''}`}>
                                    <div className={'imagecontent'}>
                                        <img
                                            style={{transform: `rotate(-${rotate}deg)`}}
                                            className={`mainImg ${rotated ? 'rotated' : ''}`}
                                            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${arrayPhotos[index].user_image.src}`}
                                            alt=""
                                        />
                                        {
                                            imageDialogPage === 'chat'?
                                                <div className={`tools ${ !userModalOpen ? 'opacity' : ''}`}>
                                                    <div>
                                                        <div
                                                            className={'avatar'}
                                                            onClick={(e) => {this.avatarClick(e, foundPost.id)}}
                                                        >
                                                            {getAvatar(foundPost.user_info)}
                                                            {
                                                                userModalOpen ?
                                                                    <UserModal userData={foundPost.user_info}/>
                                                                    : null
                                                            }
                                                        </div>
                                                        <div className={'author title'}>
                                                            <b>{foundPost.user_info.screen_name}</b>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={'pointer'}>
                                                            <a href={`${process.env.REACT_APP_BACKEND_URL}/api/downloadImage/${arrayPhotos[index].user_image.src}`}
                                                               target="_blank"
                                                               download
                                                               rel="noopener noreferrer"
                                                            >
                                                                <img  src={`/images/icons/chat/download.svg`} alt=""/>
                                                            </a>
                                                        </div>
                                                        {
                                                            dotsSelected ?
                                                                <div onClick={isOwner || moderator ? this.removeClick : this.reportClick}
                                                                     className={'pointer'}>
                                                                    <img className={'absolute'} src={`/images/icons/chat/${icon}`}
                                                                         alt=""/>
                                                                </div>
                                                                : null
                                                        }
                                                        <div onClick={this.toggle} className={'pointer dots'}>
                                                            <img src={`/images/icons/chat/dots.svg`} alt=""/>
                                                        </div>
                                                    </div>
                                                </div>
                                                :null
                                        }
                                    </div>
                                </div>

                            </Modal.Body>
                            <div className={'arrows'}>
                                <div>
                                    {
                                        index > 0 ?
                                            <img onClick={this.arrowLeft} className={'pointer'}
                                                 src={`/images/icons/chat/arrow_left.svg`} alt=""/>
                                            : null
                                    }
                                </div>
                                <div>
                                    {
                                        index < arrayPhotos.length - 1 ?
                                            <img onClick={this.arrowRight} className={'pointer'}
                                                 src={`/images/icons/chat/arrow_right.svg`} alt=""/>
                                            : null
                                    }
                                </div>
                            </div>
                        </Modal.Dialog>
                        : null
                }

                 {
                    imageDialogPage === 'messenger' && mesangerImg?
                        <Modal.Dialog className={'imageDialog'}>
                            <img className={'close'} onClick={this.close} src="/images/icons/close.svg" alt=""/>
                            <Modal.Body >
                                <div className={`content ${commentsShow ? 'commentShow' : ''}`}>
                                    <div className={'imagecontent'}>
                                        <img
                                            style={{transform: `rotate(-${rotate}deg)`}}
                                            className={`mainImg ${rotated ? 'rotated' : ''}`}
                                            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${mesangerImg.src}`}
                                            alt=""
                                        />
                                        <div className={`tools opacity`}>
                                            <div>
                                                <div className={'avatar'} onClick={(e) => {console.log(`clicked avatar`)}}>
                                                    {getAvatar(selectedUser)}
                                                </div>
                                                <div className={'author title'}>
                                                    <b>{selectedUser.screen_name}</b>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={'pointer'}>
                                                    <a href={`${process.env.REACT_APP_BACKEND_URL}/api/downloadImage/${mesangerImg.src}`}
                                                        target="_blank"
                                                        download
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img  src={`/images/icons/chat/download.svg`} alt=""/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Modal.Body>
                            <div className={'arrows'}>
                                <div>
                                    {
                                        index > 0 ?
                                            <img onClick={this.arrowLeft} className={'pointer'}
                                                 src={`/images/icons/chat/arrow_left.svg`} alt=""/>
                                            : null
                                    }
                                </div>
                                <div>
                                    {
                                        index < arrayPhotos.length - 1 ?
                                            <img onClick={this.arrowRight} className={'pointer'}
                                                 src={`/images/icons/chat/arrow_right.svg`} alt=""/>
                                            : null
                                    }
                                </div>
                            </div>
                        </Modal.Dialog>
                        : null
                }
            </>

        );
    }
}




const mapStateToProps = (state) => ({
    // postedPhotos: state.chat.postedPhotos,
    chatPhotos: state.index.chatPhotos,
    imgId: state.index.imgId,
    imageDialogPage: state.index.imageDialogPage,
    user: state.auth.user,
    userRole: state.auth.userRole,
    rooms: state.chat.rooms,
    modals: state.chat.modals,
    replys: state.chat.replys,
    replyCurrentPage: state.chat.replyCurrentPage,
    replyLastPage: state.chat.replyLastPage,
    activeRoomId: state.chat.activeRoomId,
    userMessages: state.messenger.userMessages,
    selectedUserId: state.messenger.selectedUserId,
    onlineUsers: state.auth.onlineUsers

});

const mapDispatchToProps = {
    imageDialogOpen,
    MessangerImageDialogOpen,
    report,
    removeAttachment,
    togglePostUserModal,
    getPostReplys,
    downloadImage,
    removePost
};

const ImageDialogContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ImageDialog);

export default ImageDialogContainer;
