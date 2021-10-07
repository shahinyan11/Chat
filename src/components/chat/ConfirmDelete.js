import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import PropTypes from 'prop-types';

class ConfirmDelete extends Component {

    static propTypes = {
        confirm: PropTypes.func,
        cancel: PropTypes.func
    };

    confirm = () => {
        this.props.confirm()
    };

    cancel =()=>{
        this.props.cancel()
    }

    render() {
        return (
            <div className={'ConfirmDelete'}>
                <img className={'close'} onClick={this.cancel} src={`/images/icons/close.svg`} alt=""/>
                <div className={'text'}>
                    <h2 className={'title'}>DELETE ROOM ?</h2>

                    <p>This action will permanently delete the room and its contents</p>


                    <Button onClick={this.confirm} className={'delete title'} variant="delete" type="button">
                        Delete room
                    </Button>


                    <Button className={'cancel title'} onClick={this.cancel} variant="primary" type="button">
                        CANCEL
                    </Button>

                </div>
            </div>
        );
    }
}

export default ConfirmDelete;