import React, {Component} from 'react';
import {Modal} from 'react-bootstrap'
// import SendMessage from "./SendMessage";
import {getAvatar} from "../../../helpers/helper";
import MakeMessage from "../../messenger/MakeMessage";
import {
    kick,
    banUser
} from "../../../store/actions/chat";
import {connect} from "react-redux";

const moment = require('moment');

class UserModal extends Component {

    stopClickPropagation = (e) => {
        e.stopPropagation();
    }

    kickClick = () => {
        const {kick, userData, activeRoomId} = this.props;
        kick(userData.id , activeRoomId)
    }

    banClick = () => {
        const {banUser, userData, activeRoomId} = this.props;
        banUser(userData.id , activeRoomId)
    }

    render() {
        const {userData, type, userRole, roomOwner} = this.props;
        // const data = this.props.data ? this.props.data : false;
        const moderator = userRole === 'moderator' ? true : false
        const start = moment(userData.last_login);
        const end = moment(new Date());
        const diff = end.diff(start);
        const lastLogin = moment.utc(diff).format("H[H] m[M]");
        return (
            <div className={`UserModal ${type ? type : ''}`}>
                <div className={'triangle'}></div>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title onClick={this.stopClickPropagation}>
                            <div className={'popup_avatar'}>
                                {getAvatar(userData)}
                                <div className={'gender left'}><b>{userData.gender}</b></div>
                                {/*<img className={'icon left'} src={`/images/icons/chat/alpha_m.svg`} alt=""/>*/}
                                <img className={'icon right'} src={`/images/icons/chat/video.svg`} alt=""/>
                            </div>
                            <div className={'text-center'}>
                                {userData.screen_name}
                                {/*<div className={'icons'}>*/}
                                {/*    <img src={`/images/icons/chat/alpha_m.svg`} alt=""/>*/}
                                {/*    <img src={`/images/icons/chat/video.svg`} alt=""/>*/}
                                {/*</div>*/}
                            </div>
                            <div>
                                <div className={'text'}>
                                    <div  className="text-uppercase">
                                        JOINID {moment(userData.create_date).format('MMM YYYY')}
                                    </div>
                                    <div>
                                        ONLINE {lastLogin}
                                    </div>
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body onClick={this.stopClickPropagation}>
                        {/*<div>*/}
                        {/*    <img src={`/images/icons/chat/account.svg`} alt=""/>*/}
                        {/*    <p>VIEW PROFILE</p>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <img src={`/images/icons/chat/account_plus.svg`} alt=""/>*/}
                        {/*    <p>ADD FRIEND</p>*/}
                        {/*</div>*/}
                        <div>
                            <img src={`/images/icons/chat/paperclip.svg`} alt=""/>
                            <p>SEND</p>
                        </div>
                        {/*<div>*/}
                        {/*    <img src={`/images/icons/chat/cancel.svg`} alt=""/>*/}
                        {/*    <p>KICK</p>*/}
                        {/*</div>*/}
                        {
                            moderator ?
                                <div onClick={this.kickClick}>
                                    <img src={`/images/icons/chat/kick.svg`} alt=""/>
                                    <p>KICK</p>
                                </div>
                                : null
                        }

                        {
                            roomOwner || moderator ?
                                <div onClick={this.banClick}>
                                    <img src={`/images/icons/chat/ban.svg`} alt=""/>
                                    <p>BAN</p>
                                </div>
                                :null
                        }
                        <div onClick={this.banClick}>
                            <img src={`/images/icons/chat/block.svg`} alt=""/>
                            <p>BLOCK</p>
                        </div>


                    </Modal.Body>

                    <Modal.Footer onClick={this.stopClickPropagation}>
                        {/*<SendMessage userId={userData.id}/>*/}
                        <MakeMessage userId={userData.id} inModal={true}/>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    userRole: state.auth.userRole,
    activeRoomId: state.chat.activeRoomId,
    roomOwner: state.chat.roomOwner,
});

const mapDispatchToProps = {
    kick,
    banUser
};

const UserModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserModal);


export default UserModalContainer;
