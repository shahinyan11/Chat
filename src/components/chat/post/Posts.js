import React, {Component} from 'react';
import {changeActiveRoom} from "../../../store/actions/chat";
import {connect} from "react-redux";
import UserPost from "./UserPost";
import UserJoin from "./UserJoin";

class Posts extends Component {

    render() {
        const {post} = this.props;
        return (
            <>
                {
                    post.type === 'room_join' ||  post.type === 'room_left' ?
                        <UserJoin post={post}/>
                        :<UserPost post={post}/>
                }

            </>


        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    changeActiveRoom,

};

const PostsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Posts);


export default PostsContainer;
