import React, {Component} from 'react';
import {Form, Button, Col} from 'react-bootstrap'
import {connect} from "react-redux";
import {selectCreateRoom, createRoom} from "../../store/actions/chat";

class CreateRoom extends Component {

    constructor(props){
        super(props);

        this.state = {
            checked: false
        }
    }

    close = () =>{
        this.props.selectCreateRoom('close')
    };

    handleCheck = (e) => {
        this.setState({
            checked: e.target.checked
        })
    };

    createRoom = (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        this.props.createRoom(data)
    };

    render() {
        const{checked} = this.state
        return (
            <div className={'CreateRoom'}>
                <img className={'close'} onClick={this.close} src={`/images/icons/close.svg`} alt=""/>
                <h2 className={'title'}>Create a new room</h2>
                <Form className={'text'} onSubmit={this.createRoom}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Room name</Form.Label>
                            <Form.Control type="text" name="name"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Room rules</Form.Label>
                        <Form.Control as="textarea" rows="10" name="description"/>
                    </Form.Group>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check onChange={this.handleCheck} type="checkbox" label="Require password to join"/>
                    </Form.Group>

                    {
                        checked ?
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password"/>
                                </Form.Group>
                            </Form.Row>
                            :null
                    }
                    <Form.Row>
                        <Button className={'create'} variant="primary" type="submit" >
                            CREATE
                        </Button>
                    </Form.Row>
                    <Form.Row>
                        <Button className={'cancel text'} onClick={this.close} variant="primary" type="button" >
                            CANCEL
                        </Button>
                    </Form.Row>
                </Form>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    selectCreateRoom,
    createRoom
};

const CreateRoomContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateRoom);

export default CreateRoomContainer;
