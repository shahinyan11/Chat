import React, {Component} from 'react';

import {
    like,
} from "../../store/actions/chat";
import {connect} from "react-redux";

class LikeProgress extends Component {

    constructor(props) {
        super(props);

        this.state = {
            liked: null,
            score: 0
        }
    }

    componentWillMount() {
        const {attachment} = this.props;
        this.setState({
            liked: attachment.chat_attachment_votes ? true : false,
            score: attachment.score
        })
    }

    likeClick = () => {
        const {like, attachment} = this.props;
        const {liked, score} = this.state;
        if(liked){
            this.setState({
                liked: !liked,
                score: score > 0 ? score - 1 : 0
            })
        }else{
            this.setState({
                liked: !liked,
                score: score + 1
            })
        }
        like(
            attachment.id,
            attachment.chat_room_id,
            attachment.chat_post_id
        )

        // ##### For Forum #####
        // const {like, post} = this.props;
        // like(
        //     post.id,
        //     post.chat_room_id,
        // )
    };

    // dislikeClick = () => {
    //     const {like, attachment} = this.props;
    //     like(
    //         attachment.id,
    //         0,
    //         attachment.chat_room_id,
    //         attachment.chat_post_id
    //     )
    // };

    render() {
        const {attachment} = this.props;
        const {liked, score} = this.state;
        const like = liked !== null ?  liked : attachment.chat_attachment_votes ? true : false;

        // ##### For Forum #####
        // const {post,} = this.props;
        // const like = post.chat_post_votes ? true : false;
        // const {score} = post;
        return (
            <div className={'LikeProgress'} >
               {score}
                <img className={'pointer'}
                     src={`/images/icons/chat/${!like ? 'like': 'like_green' }.svg`}
                     onClick={this.likeClick}
                     alt=""
                />
                Like
                {/*{*/}
                {/*    progressShow ?*/}
                {/*        <div className={'progress'}>*/}
                {/*            <div className={'progress_value'}*/}
                {/*                 style={{width: `${attachment.score}%`}}></div>*/}
                {/*            <span className={'percent'}>{parseInt(attachment.score)} % GAVE OKS</span>*/}
                {/*        </div>*/}
                {/*        : null*/}
                {/*}*/}

                {/*{*/}
                {/*    like === 1 || like === null ?*/}
                {/*        <img className={'pointer'}*/}
                {/*             src="/images/icons/thumb_down.svg"*/}
                {/*             onClick={this.dislikeClick}*/}
                {/*             alt=""/>*/}
                {/*        : null*/}
                {/*}*/}

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    rooms: state.chat.rooms
});

const mapDispatchToProps = {
    like,
};

const LikeProgressContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LikeProgress);


export default LikeProgressContainer;