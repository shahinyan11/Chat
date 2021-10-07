import React, {Component} from 'react';
import {connect} from "react-redux";
import Reply from "./Reply";
// import MakeComment from "./MakeComment";
import {
    getPostReplys
} from "../../../store/actions/chat";

class PostReplys extends Component {

    loadMore = (postId) => {
        const {replyCurrentPage, replyLastPage} = this.props;
        if (replyCurrentPage !== replyLastPage || (!replyCurrentPage && !replyLastPage)) {
            this.props.getPostReplys(postId, replyCurrentPage + 1)
        }
    }

    render() {
        const {
            post,
            // replyCurrentPage,
            // replyLastPage
        } = this.props;
        const replys = post.chat_post_reply ? post.chat_post_reply : [];
        // const loadMoreShow = replyCurrentPage !== replyLastPage && replys[post.id] && replys[post.id];
        return (
            <div className={'PostReplys'}>
                {
                    replys.map((reply) => (
                        <Reply psotReply={reply} key={reply.id}/>
                    ))
                }
                {/*{*/}
                {/*    loadMoreShow ?*/}
                {/*        <div*/}
                {/*            className={'loadMore'}*/}
                {/*            onClick={() => {*/}
                {/*                this.loadMore(post.id)*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            LOAD MORE REPLYS*/}
                {/*        </div>*/}
                {/*        : null*/}
                {/*}*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    replyTo: state.chat.replyTo,
    replyCurrentPage: state.chat.replyCurrentPage,
    replyLastPage: state.chat.replyLastPage,
    rooms: state.chat.rooms,
});

const mapDispatchToProps = {
    getPostReplys,
};

const PostReplysContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostReplys);


export default PostReplysContainer;
