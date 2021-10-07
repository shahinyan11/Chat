import React, {Component} from 'react';
import {ToggleImageTool, report, removeAttachment, removePost} from "../../../store/actions/chat";
import {connect} from "react-redux";

class ImageTools extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reported: null
        }
    }

    componentWillMount() {
        const {attachment} = this.props;
        this.setState({
            reported: attachment.report
        })
    }

    toggle = () => {
        const {ToggleImageTool, attachment} = this.props;
        ToggleImageTool(attachment.user_image.id)
    };


    stopClickPropagation = (e) => {
        e.stopPropagation();
    };

    removeClick = () => {
        const {removeAttachment, attachment, post, removePost} = this.props;
        // const image = attachment.user_image;
        if(post.chat_attachment.length < 2){
            removePost({post})
        }else{
            removeAttachment(
                attachment.chat_room_id,
                attachment.chat_post_id,
                attachment.id
            )
        }

    };

    reportClick = () => {
        const {report, attachment} = this.props;
        const{reported} = this.state;
        // const image = attachment.user_image;
        this.setState({
            reported: !reported
        })
        report(
            {
                // property_id: image.id,
                property_id: attachment.id,
                property_type: 'chat_attachment'
            },
            attachment.chat_room_id,
            attachment.chat_post_id,
            null,
            attachment.id
            // image.id
        )
    };

    render() {
        const {modals, attachment, user, userRole} = this.props;
        const{reported} = this.state;
        const image = attachment.user_image;
        const open = Number(modals.postImageTool.id) === Number(image.id) ? modals.postImageTool.open : false;
        const moderator = userRole === 'moderator' ? true : false
        const isOwner = image.owner_id === user.id;
        const imageReported = reported !== null ? reported : attachment.report;
        const icon = isOwner || moderator ? 'delete.svg' : imageReported ? 'flag_red.svg' : 'flag.svg';
        return (
            <ul className={'ImageTools'} onClick={this.stopClickPropagation}>
                {
                    open ?
                        <>
                            <li>
                                <a
                                    href={`${process.env.REACT_APP_BACKEND_URL}/uploads/${image.src}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img className={'pointer'} src={`/images/icons/chat/resize.svg`} alt=""/>
                                </a>
                            </li>
                            <li>
                                <a href={`${process.env.REACT_APP_BACKEND_URL}/api/downloadImage/${image.src}`}
                                   target="_blank"
                                   download
                                   rel="noopener noreferrer"
                                >
                                    <img className={'pointer'}  src={`/images/icons/chat/download.svg`} alt=""/>
                                </a>
                            </li>
                            <li>
                                <img
                                    className={'pointer'}
                                    onClick={isOwner || moderator ? this.removeClick : this.reportClick}
                                    src={`/images/icons/chat/${icon}`} alt=""/>
                            </li>

                        </>
                        : null
                }
                <li onClick={this.toggle} className={'dots pointer'}>
                    <img src={`/images/icons/chat/dots.svg`} alt=""/>
                </li>
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    modals: state.chat.modals,
    userRole: state.auth.userRole,
    rooms: state.chat.rooms,
});

const mapDispatchToProps = {
    ToggleImageTool,
    removeAttachment,
    report,
    removePost
};

const ImageToolsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ImageTools);

export default ImageToolsContainer;
