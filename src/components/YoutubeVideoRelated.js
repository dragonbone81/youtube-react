import React from 'react'
import {Link, withRouter} from 'react-router-dom';

const YoutubeVideoRelated = ({video, history, changeCurrentVideo}) => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <div className="d-flex flex-row video-top-container mb-3">
            <div onClick={() => history.push(`/video/${video.id}`)}
                 style={{backgroundImage: `url("${video.snippet.thumbnails.high.url}")`}}
                 className="align-self-start mr-3 video-image-related"/>
            <div className="d-flex flex-column">
                <h6
                    onClick={() => changeCurrentVideo(video.id.videoId)}
                    className="video-related-title"
                >
                    <Link to={`/video/${video.id.videoId}`}>{video.snippet.title}</Link>
                </h6>
                <span className="font-weight-lighter">
                    <Link to={`/channel/${video.snippet.channelId}`}>{video.snippet.channelTitle}</Link>
                </span>
            </div>
        </div>
    )
};
export default withRouter(YoutubeVideoRelated);