import React, {Component} from 'react';
import {connect} from "react-redux";
import {closeErrorNotification} from "../store/actions/chat";

class ErrorNotification extends Component {

    componentDidMount() {
        const {closeErrorNotification} = this.props;
        setTimeout(()=>{
            closeErrorNotification()
        }, 2000)
    }


    render() {
        // const {errorNotification} = this.props;
        return (
            <div className={'ErrorNotification'}>
                {/*<div  className={'text'}>*/}
                {/*    {errorNotification.message}*/}
                {/*</div>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    errorNotification: state.error.errorNotification,
});

const mapDispatchToProps = {
    closeErrorNotification
};

const ErrorNotificationContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ErrorNotification);

export default ErrorNotificationContainer;