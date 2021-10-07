import React, {Component} from 'react';
import {sendMessage} from "../../../store/actions/messenger";
import {connect} from "react-redux";

class SendMessage extends Component {

    sendMessage = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        e.target.message.value = '';


        if(message !== '') {
            const data = new FormData();
            data.append('userId', this.props.userId);
            data.append('message', message);
            this.props.sendMessage(data);
        }
    };

    render() {
        return (
            <div className={'SendMessage'}>
                <form onSubmit={this.sendMessage}>
                    <div>
                        <img src={`/images/icons/chat/message_outline.svg`} alt=""/>
                    </div>
                    <div className={'message'}>
                        <input type="text" name={'message'} placeholder={'Message'}/>
                    </div>

                    <button type="submit" className={'send_icon pointer'}>
                        <i className="material-icons">
                            send
                        </i>
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    sendMessage
};

const SendMessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SendMessage);

export default SendMessageContainer;
