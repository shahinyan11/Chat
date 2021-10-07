import React from 'react';
import {connect} from "react-redux";
import TextMessage from "./TextMessage";
import CallMessage from "./CallMessage";
import MakeMessage from "./MakeMessage";


class Message extends React.Component {

    constructor(props) {
        super(props);

        this.input = null;

        this.state = {
            rating: 1,
            message: '',
            files: [],
        };
    }

    render() {

        const {user, userMessages} = this.props;

        return (
            <>
                <div className={'message_bord'}>
                    {
                        userMessages.map((value, index) => (
                            <div key={index}
                                 className={`message_item ${value.call_id ? 'center' : value.author_id === user.id ? 'right' : 'left'}`}
                            >
                                {
                                    value.call_id  && value.call ?

                                        <CallMessage data={value}/>
                                    :
                                        <div>
                                            <TextMessage data={value}/>
                                        </div>
                                }
                            </div>
                        ))
                    }
                </div>
                <MakeMessage/>
            </>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    userMessages: state.messenger.userMessages,

});

const mapDispatchToProps = {
};

const MessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Message);

export default MessageContainer;
