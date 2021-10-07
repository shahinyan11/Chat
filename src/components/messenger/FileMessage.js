import React, {Component} from 'react';

class FileMessage extends Component {
    render() {
        const{data} = this.props
        return (
            <>
                <div className={'message'} >
                    {
                        data.type ?
                            <img src={`/uploads/${data.url}`} alt=""/>
                            :
                            <img src={`/images/icons/forum.svg`} className={'file_icon'} alt=""/>
                    }
                </div>
                <div className={'bottom'}>
                    <div className={'time'}>16:20</div>
                    <div className={'triangle'}></div>
                </div>
            </>
        );
    }
}

export default FileMessage;
