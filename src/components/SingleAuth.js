import React, {Component} from 'react';
import {connect} from "react-redux";
import { withRouter} from 'react-router-dom'
import {singleSignIn} from "../store/actions/auth";

class SingleAuth extends Component {
    componentDidMount() {
        const {match, singleSignIn} = this.props;
        singleSignIn(match.params)
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    singleSignIn,
};

const SingleAuthContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SingleAuth);

export default withRouter(SingleAuthContainer);
