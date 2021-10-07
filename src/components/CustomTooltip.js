import React, {Component} from 'react';

class CustomTooltip extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default CustomTooltip;