import React, {Component} from 'react';
import {Modal} from 'react-bootstrap'
import {getAvatar} from "../../helpers/helper";
import {connect} from "react-redux";
import {selectProfileEdit} from  '../../store/actions/home'

class ProfileSettings extends Component {

    selectEdit = () => {
        this.props.selectProfileEdit()
    }

    render() {
        const {user} = this.props;
        return (
            <>
                {
                    user ?
                        <div className={'ProfileSettings'}>
                            <Modal.Dialog>
                                <Modal.Body>
                                    <div className={'popup_avatar'}>
                                        {getAvatar(user)}
                                        <div className={'gender left'}><b>{user.gender}</b></div>
                                        <img onClick={this.selectEdit} className={' edit icon_right icon '} src="/images/icons/home/pencil.svg" alt=""/>
                                    </div>
                                    <div>
                                        <div style={{display: 'flex'}}>
                                            <span><b>{user.screen_name}</b></span>
                                        </div>
                                        <div className={'text'}>
                                            JOINID JUN 2012
                                        </div>
                                    </div>
                                    <div className={'sex'}>
                                        <b>Sex</b>
                                        <div>
                                            <label className={'pointer'}>
                                                <input type="radio"  name={'sex'} value={'male'} />
                                                MALE
                                            </label>
                                        </div>
                                        <div >
                                            <label className={'pointer'}>
                                                <input type="radio" name={'sex'} value={'female'} />
                                                FEMALE
                                            </label>
                                        </div>
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
    profileEditSelected: state.home.profileEditSelected,
});

const mapDispatchToProps = {
    selectProfileEdit
};

const ProfileSettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileSettings);

export default ProfileSettingsContainer;
