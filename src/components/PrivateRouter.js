import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux";

class PrivateRouter extends Component {

    start = ({component: Component, ...rest}) => {
        const token = localStorage.getItem('token');
        return (
            <Route {...rest} render={(props) => {
                return (
                    token ?
                        <Component {...props} />
                        :
                        <Redirect to='/login'/>
                )
            }}/>
        )
    }

    render() {
        return (
            this.start(this.props)
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

const PrivateRouterContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PrivateRouter);

export default PrivateRouterContainer;
