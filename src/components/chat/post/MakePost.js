import React, {Component} from 'react';
import {connect} from "react-redux";
import {makePost, addTemporaryPost, openErrorNotification, replyTo} from "../../../store/actions/chat";
import nextId from "react-id-generator";


class MakePost extends Component {

    constructor(props) {
        super(props);

        this.input = null;

        this.state = {
            selectedImage: "",
            files: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
         const {replyTo} = this.props;
        if (replyTo.userName !== '') {
            this.input.focus()
        }
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
        // const {rooms, scrollContent, scrollElem} = this.props;
        // if(rooms !== nextProps.rooms && scrollElem){
        //     scrollElem.scrollTop = scrollContent.clientHeight;
        // }
        // return true
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        const {scrollElem, scrollContent, addTemporaryPost, activeRoomId,replyToUser} = this.props;
        const {files} = this.state;
        const message = e.target.message.value;
        const temporaryId = nextId();
        const temporaryPost = {
            id: temporaryId,
            chat_room_id: activeRoomId,
            body: message,
            chat_attachment: [],
            user_info: this.props.user,
            temporary: true
        };

        if (message.trim() !== '' || files.length > 0) {
            const data = new FormData();
            let sendAccess = true;
            files.forEach((value) => {
                if (!value.uploadAccess) {
                    sendAccess = false
                }
                data.append('file[]', value.file);
                temporaryPost.chat_attachment.push({
                    id: nextId(),
                    user_image: {src: value.imagePreviewUrl}
                })
            });
            if (sendAccess) {
                data.append('roomId', activeRoomId);
                data.append('message', message);
                if(replyToUser.userName){
                    data.append('replyTo', replyToUser.userName);
                }

                this.props.makePost(data, temporaryId);
                e.target.message.value = '';
                this.props.replyTo()
                this.setState({
                    files: []
                })
                addTemporaryPost(temporaryPost);
            }
        }
        scrollElem.scrollTop = scrollContent.clientHeight;
        this.setState({
            selectedImage: ""
        })
    };

    handleChange = (e) => {
        e.preventDefault();
        const data = Array.from(e.target.files);
        data.forEach((file) => {
            const reader = new FileReader();
            const filesSize = Number(file.size / 1048576);
            const {files} = this.state;
            reader.onloadend = () => {
                files.push({
                    file: file,
                    imagePreviewUrl: reader.result,
                    uploadAccess: filesSize < process.env.REACT_APP_MAX_UPLOAD_IMAGE_SIZE

                });
                this.setState({
                    files: [...files]
                })
            };
            reader.readAsDataURL(file)
        });
        this.setState({
            selectedImage: ""
        })
    };

    removeUploadItem = (file) => {
        const {files} = this.state;
        const filterFiles = files.filter((value) => {
            return value !== file ? true : false
        });
        this.setState({
            files: [...filterFiles]
        })
    };
    removeReply = () => {
        this.props.replyTo()
    };


    render() {
        const {replyToUser} = this.props;
        const {files} = this.state;
        const haveReply = replyToUser.userName ? true : null;
        return (
            <div className={'MakePost'}>
                <div className={'reviewImages'}>
                    {
                        files.map((file, index) => (
                            <div key={index}>
                                <img className={'close'} onClick={() => {
                                    this.removeUploadItem(file)
                                }} src={`/images/icons/close.svg`} alt=""/>
                                <img src={file.imagePreviewUrl} alt="" height={'100px'}/>
                                {
                                    !file.uploadAccess ?
                                        <span>
                                                <img src="/images/icons/chat/cloud_alert.svg" alt=""/>
                                                MAX IMAGE SIZE 10MB
                                            </span>
                                        : null
                                }
                            </div>

                        ))
                    }
                </div>
                <div className={'send_bord'}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={'pointer'}>
                            <label className={'pointer'} htmlFor="file">
                                <i className="material-icons">
                                    photo_camera
                                </i>
                            </label>
                            <input onChange={this.handleChange} id={'file'} className={'file_input'} type="file"
                                   name='file' value={this.state.selectedImage} multiple/>
                        </div>

                        <div className={'message'}>
                            {
                                haveReply ?
                                    <div className={'replyInput'}>
                                        <img className={'close'} onClick={this.removeReply}
                                             src="/images/icons/close.svg" alt=""/>
                                        @{replyToUser.userName}
                                    </div>
                                    : null
                            }

                            <input
                                ref={(el) => {
                                    this.input = el
                                }}
                                className={'mainInput'}
                                type="text"
                                name={'message'}
                                placeholder={!haveReply ? 'Type your message here' : ''} autoComplete="off"/>
                        </div>

                        <button type="submit" className={'send_icon pointer'}>
                            <i className="material-icons">
                                send
                            </i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
    replyToUser: state.chat.replyToUser

});

const mapDispatchToProps = {
    makePost,
    addTemporaryPost,
    openErrorNotification,
    replyTo
};

const MakePostContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MakePost);


export default MakePostContainer;
