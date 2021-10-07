import React, {Component} from 'react';
import {urlify, pastTime} from "../../helpers/helper";
import getUrls from "get-urls";
import ReactTinyLink from 'react-tiny-link';
import {
    imageDialogOpen,
} from "../../store/actions/index";
import {connect} from "react-redux";

class TextMessage extends Component {

    openDialog = (imgId) => {
        const {imageDialogOpen} = this.props;
        imageDialogOpen(true, imgId, 'messenger')
    };

    render() {
        const {data} = this.props;
        const imagesExist = data.message_attachment.length > 0;
        return (
            <>
                {
                    imagesExist ?
                        <div className={'imagesContent'}>
                            <div className={'message'}>
                                {
                                    data.message_attachment.map((attachment) => (
                                        <div className={'imageItem'} key={attachment.id}>
                                            {
                                                attachment.type === 'image' ?
                                                    <img
                                                        onClick={() => { this.openDialog(attachment.user_image.id) }}
                                                        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${attachment.user_image.src.replace('.', '_400.')}`}
                                                        alt=""/>
                                                    :
                                                    <img src={`/images/icons/forum.svg`} className={'file_icon'}
                                                         alt=""/>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={'bottom'}>
                                <div className={'time'}> {pastTime(data.created_at)} </div>
                            </div>
                        </div>
                        : null
                }

                {
                    data.body ?
                        <>
                            <div className={'textContent'}>
                                <div className={'message'} dangerouslySetInnerHTML={{__html: urlify(data.body)}}></div>
                                {
                                    [...getUrls(data.body)].map((value) => (
                                        <ReactTinyLink
                                            cardSize="small"
                                            showGraphic={true}
                                            maxLine={2}
                                            minLine={1}
                                            url={value}
                                        />
                                    ))
                                }
                                < div className={'bottom'}>
                                    <div className={'time'}>{pastTime(data.created_at)}</div>
                                    <div className={'triangle'}>{data.screen_name}</div>
                                </div>
                            </div>
                        </>
                        : null
                }

            </>
        );
    }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    imageDialogOpen,
};

const TextMessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TextMessage);


export default TextMessageContainer;