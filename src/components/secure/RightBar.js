import React, {Component} from 'react';
// import FindUser from "./FindUser";
import {connect} from "react-redux";

class RightBar extends Component {


    UNSAFE_componentWillMount() {
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
    }

    handleClick = (id) => {
        this.setState({
            active: id
        })
    };

    render() {
        return (
            <>
                <div className="top">


                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    postedPhotos: state.chat.postedPhotos
});

const mapDispatchToProps = {
};

const RightBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightBar);

export default RightBarContainer;
