import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import '../asset/sass/home.scss'
import {Button, Col, Form} from "react-bootstrap";
import RightBar from "../components/home/RightBar";
import {signOut} from "../store/actions/auth";
import {connect} from "react-redux";
import data from "../services/data";
import {changeActiveMenu} from "../store/actions/menu";

class Home extends Component {

    componentWillMount() {
        this.props.changeActiveMenu(data.menu.home.id)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signOut()
    }

    render() {
        return (
            <div id={'home'}>
                <Wrapper>
                    <div className={'my_left_bar'}>
                        <div className={'sub_menu'}>

                            <Form className={'text'} onSubmit={this.handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Button className={'logOut title'} type="submit">
                                            <b>LOG OUT</b>
                                            <div className={'icon'}></div>
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>

                        </div>
                    </div>
                    <div className={'my_container'}>
                        <div className={'my_content'}>
                        </div>
                    </div>
                    <div className={'my_right_bar'}>
                        <RightBar/>
                    </div>
                </Wrapper>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    signOut,
    changeActiveMenu
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);

export default HomeContainer
