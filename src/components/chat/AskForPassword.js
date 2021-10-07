import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {getRooms, roomJoin} from "../../store/actions/chat";
import {connect} from "react-redux";

class AskForPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'message@username'
        };
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleClick = () => {
        const {activeRoomId, user} = this.props;
        this.props.roomJoin(activeRoomId, user.id);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {activeRoomId, roomJoin} = this.props;
        roomJoin(activeRoomId, this.state.password);
    }

    render() {
        const {message} = this.state;
        // const {rooms, activeRoomId} = this.props
        // const activeRoom = rooms.filter((room) => {
        //     return room.id === activeRoomId ? true : false
        // })[0]
        return (
            <Form id={'AskForPassword'} className={'text'} onSubmit={this.handleSubmit}>
                <h3><b>THIS ROOM IS LOCKED.</b></h3>
                <h6>CONTACT THE ROOM ADMINISTRATOR</h6>
                <div>
                    <img src={`/images/icons/chat/lock_open.svg`} alt=""/>
                    <div>Username</div>
                </div>

                <Form.Group controlId="formGridMessage">
                    <Form.Control onChange={this.handleChange} type="text" name="message" value={message}/>
                </Form.Group>

                <span className={'text'}>
                    or click below to send a automated request
                </span>
                {/*<button onClick={this.handleClick}>AGREE AND JOIN</button>*/}
                <Form.Group>
                    <Button className={'save'} type="submit">
                        ASK FOR PASSWORD
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    activeRoomId: state.chat.activeRoomId,
    user: state.auth.user,
    rooms: state.chat.rooms
});

const mapDispatchToProps = {
    roomJoin,
    getRooms
};

const AskForPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AskForPassword);

export default AskForPasswordContainer;
