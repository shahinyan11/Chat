import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import '../asset/sass/page404.scss'

class Page404 extends Component {
    render() {
        return (
            <div id="Page404">
                <Wrapper>
                        <div className={'my_container'}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="error-template title">
                                            <h1>
                                                Oops!</h1>
                                            <h2>
                                                404 Not Found</h2>
                                            <div className="error-details">
                                                Sorry, an error has occured, Requested page not found!
                                            </div>
                                            {/*<div className="error-actions">*/}
                                            {/*    <Link to="/" className="btn btn-primary btn-lg">*/}
                                            {/*        <span className="glyphicon glyphicon-home"></span>*/}
                                            {/*        Take Me Home*/}
                                            {/*    </Link>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </Wrapper>
            </div>

        );
    }
}

export default Page404;
