import React, {Component} from 'react';
import {makeComment} from "../../../store/actions/chat";
import {connect} from "react-redux";

class MakeComment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {replyTo, postId} = nextProps;
        if (this.props.replyTo !== replyTo) {
            if (Number(replyTo.postId) === Number(postId)) {
                this.setState({
                    text: replyTo.username
                })

            } else {
                this.setState({
                    text: ''
                })
            }
        }
        return true

    }


    handleSubmit = (e) => {
        e.preventDefault();
        const {activeRoomId, user, postId} = this.props;
        const comment = e.target.comment.value;
        e.target.comment.value = '';
        if(comment.trim() !== ''){
            const data = new FormData(e.target);
            data.append('userId', user.id);
            data.append('postId', postId)
            data.append('roomId', activeRoomId)
            data.append('comment', comment);
            this.props.makeComment(data)
        }
    };

    handleCange = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    render() {

        const {text} = this.state;
        return (
            <div className={'MakeComment'}>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <img src="/images/icons/chat/forum_outline.svg" alt=""/>
                    </div>
                    <div className={'message'}>
                        <input onChange={this.handleCange} type="text" name={'comment'} value={text}
                               placeholder={'Comment'} autoComplete="off"/>
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
    activeRoomId: state.chat.activeRoomId,
    user: state.auth.user,


});

const mapDispatchToProps = {
    makeComment
};

const MakeCommentContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MakeComment);

export default MakeCommentContainer;
