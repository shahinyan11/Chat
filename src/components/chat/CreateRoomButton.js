import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {selectCreateRoom} from "../../store/actions/chat";
import {connect} from "react-redux";

class CreateRoomButton extends Component {

    handleClick = () =>{
        this.props.selectCreateRoom()
    }

    render() {
        const {selectedCreateRoom} = this.props
        return (
            <div className={`CreateRoomButton ${selectedCreateRoom ? 'active': ''}`}>
                <Button onClick={this.handleClick} variant="outline-dark">
                    <div className={'text'}>CREATE A ROOM</div>
                    <img src={`/images/icons/chat/${selectedCreateRoom ? 'plus_activ.svg': 'plus.svg'}`} alt=""/>
                </Button>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    selectedCreateRoom: state.chat.selectedCreateRoom
});

const mapDispatchToProps = {
    selectCreateRoom
};

const CreateRoomButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateRoomButton);

export default CreateRoomButtonContainer;
