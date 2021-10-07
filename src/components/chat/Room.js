import React, {Component} from 'react';
import ScrollLoad from "./ScrollLoad";
import RightBar from "./RightBar";
import {
    roomLeave
} from "../../store/actions/chat";
import {connect} from "react-redux";
import {getActiveRoom} from "../../helpers/helper";

class Room extends Component {

    handleClick = () => {
        const {activeRoomId} = this.props;
        this.props.roomLeave(activeRoomId)
    };

    render() {
        const {rooms, activeRoomId, photosCount} = this.props;
        const room = rooms ? getActiveRoom(rooms, activeRoomId) : null;
        return (
            room ?
                <>
                    <div className={'my_content'}>
                        <div className={'contentTop'}>
                            <ul>
                                <li><h4>{room.name}</h4></li>
                                <li>{photosCount} IMAGES POSTED PAST {room.retention ? `${room.retention} HOURS` : 'FULL TIME'}  </li>
                            </ul>
                            <ul>

                                <li onClick={this.handleClick}
                                    className={'pointer'}>
                                    LEAVE THE ROOM
                                </li>
                            </ul>
                        </div>
                        <ScrollLoad/>
                    </div>
                    <div className={'my_right_bar'}>
                        <RightBar/>
                    </div>
                </>
                : null
        );
    }
}


const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    rooms: state.chat.rooms,
    photosCount: state.index.photosCount,

});

const mapDispatchToProps = {
    roomLeave
};

const RoomContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Room);

export default RoomContainer;

