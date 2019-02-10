import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

class VideoPage extends Component {
    componentDidMount() {
        if (!this.props.store.currentVideoExists) {
            this.props.store.getCurrentVideo(this.props.match.params.video_id);
        }
    }

    numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    BASE_EMBED_URL = 'https://www.youtube.com/embed';

    render() {
        return (
            <div>
                {this.props.store.currentVideoExists &&
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-lg-8 d-flex flex-column border-bottom pb-1">
                        <div className="i-frame-video-div embed-responsive embed-responsive-16by9">
                            <iframe allowFullScreen title='video'
                                    src={`${this.BASE_EMBED_URL}/${this.props.store.currentVideo.id}`}/>
                        </div>
                        <h5 className="video-description mt-2">{this.props.store.currentVideo.snippet.title}</h5>
                        <div className="d-flex">
                            <div
                                style={{backgroundImage: `url("${!!this.props.store.currentChannelInfo.id ? this.props.store.currentChannelInfo.snippet.thumbnails.medium.url : "https://womenaccelerators.org/wp-content/uploads/2018/03/default-profile.png"}")`}}
                                className="align-self-start mr-3 channel-image"/>
                            <h4 className="align-self-center">{!!this.props.store.currentChannelInfo.id ? this.props.store.currentChannelInfo.snippet.title : "Loading..."}</h4>
                            <div className="video-stats d-flex flex-column ml-auto align-self-end">
                                <h5 className="align-self-end">{this.numberWithCommas(!!this.props.store.currentChannelInfo.id ? this.props.store.currentVideo.statistics.viewCount : 0)} views</h5>
                                <div className="progress" style={{height: 3}}>
                                    {!!this.props.store.currentChannelInfo.id &&
                                    <div className="progress-bar" role="progressbar"
                                         style={{width: `${Math.round((Number(this.props.store.currentVideo.statistics.likeCount) / (Number(this.props.store.currentVideo.statistics.likeCount) + Number(this.props.store.currentVideo.statistics.dislikeCount))) * 100)}%`}}
                                         aria-valuenow={`${Math.round(((Number(this.props.store.currentVideo.statistics.likeCount) / (Number(this.props.store.currentVideo.statistics.likeCount) + Number(this.props.store.currentVideo.statistics.dislikeCount))) * 100))}`}
                                         aria-valuemin="0"
                                         aria-valuemax="100"
                                    />
                                    }
                                </div>
                                <div className="video-like-dislike d-flex justify-content-between mt-2">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <i className="fas fa-thumbs-up mr-2"/>
                                        <span>{this.numberWithCommas(Number(this.props.store.currentVideo.statistics.likeCount))}</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center">
                                        <i className="fas fa-thumbs-down mr-2"/>
                                        <span>{this.numberWithCommas(Number(this.props.store.currentVideo.statistics.dislikeCount))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    < div className="col-md-4">what</div>
                </div>
                }
            </div>
        );
    }
}

export default withRouter(inject("store")(observer(VideoPage)));
