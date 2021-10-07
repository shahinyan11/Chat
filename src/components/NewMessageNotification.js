import React, {Component} from 'react';
import {getAvatar} from "../helpers/helper";

class NewMessageNotification extends Component {
    render() {
        const {data} = this.props;
        const user = data ? data.user_info : null
        return (
            <div className={'NewMessageNotification'}>
                <div className={'message'}>
                    YOU HAVE A NEW MESSAGE FROM
                    <div  className={'avatar'}>{ user ? getAvatar(user): ''}</div>
                    {user ? user.screen_name : ''}
                </div>
            </div>
        );
    }
}



export default NewMessageNotification;