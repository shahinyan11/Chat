import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'
import {getAvatar} from "../../helpers/helper";
import {connect} from "react-redux";


class ProfileAvatarUpload extends Component {
    render() {
        const {user} = this.props;
        return (
            <>
                {
                    user ?
                        <div className={'ProfileAvatarUpload'}>
                            <Modal.Dialog>
                                <Modal.Body>
                                    <div className={'popup_avatar'}>
                                        {getAvatar(user)}
                                    </div>
                                    <div>
                                        <div style={{display: 'flex'}}>
                                            <span><b>{user.screen_name}</b></span>
                                        </div>
                                    </div>
                                    <div className={'generatedAvatars'}>
                                    </div>
                                </Modal.Body>
                            </Modal.Dialog>
                        </div>
                        : null
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

const mapDispatchToProps = {};

const ProfileAvatarUploadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileAvatarUpload);

export default ProfileAvatarUploadContainer;
