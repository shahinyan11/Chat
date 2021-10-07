import React, {Component} from 'react';
import '../asset/css/login.css'
// import validator from 'validator'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import {getUserInfo, signIn} from "../store/actions/auth";


// const validate = (values) => {
//     const errors = {};
//     if (!values.email) {
//         errors.email = 'Required'
//     } else if (!validator.isEmail(values.email)) {
//         errors.email = 'Invalid email address'
//     }
//     return errors
// }

class Login extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {token} = this.props
        if ( nextProps.token && nextProps.token  !== token){
            nextProps.getUserInfo();
        }
        return true
    }

    handleSubmit = (e) => {

        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        this.props.signIn(data)
    }

    render() {
        const token = localStorage.getItem('token');
        const {data} = this.props;
        return (
            <>
                {token ?
                    <Redirect to="/chat"/>
                    :
                    <div className="app flex-row align-items-center pace-done" style={{'backgroundColor': '#e4e5e6'}}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="card-group">
                                        <div className="card p-4">
                                            <form onSubmit={(e) => {
                                                this.handleSubmit(e)
                                            }} className="card-body">
                                                <h1>Login</h1>
                                                <p className="text-muted">Sign In to your account</p>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                    <i className="icon-user"></i>
                                                    </span>
                                                    </div>
                                                    <input className="form-control" type="email" name={'email'}
                                                           placeholder="Email"/>
                                                </div>
                                                <div className="input-group mb-4">
                                                    <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                    <i className="icon-lock"></i>
                                                    </span>
                                                    </div>
                                                    <input className="form-control" autoComplete={'of'} type="password" name={'password'}
                                                           placeholder="Password"/>
                                                    {
                                                        data && !data.success ?
                                                            <em id="email-error" className="error invalid-feedback">{data.message}</em>
                                                            : null
                                                    }

                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <button className="btn btn-primary px-4" type="submit">Login
                                                        </button>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        <button className="btn btn-link px-0" type="button">Forgot
                                                            password?
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    userData: state.auth.userData,
    data: state.auth.data,
    token: state.auth.token,
});

const mapDispatchToProps = {
    signIn,
    getUserInfo
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

// export default withRouter(LoginContainer);
export default LoginContainer;
