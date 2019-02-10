import React from 'react'
import {Link, withRouter} from 'react-router-dom';

const YoutubeVideo = ({video, history}) => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <div className="d-flex flex-row video-top-container">
            <div onClick={() => history.push(`/video/${video.id}`)}
                 style={{backgroundImage: `url("${video.snippet.thumbnails.high.url}")`}}
                 className="align-self-start mr-3 video-image"/>
            <div className="d-flex flex-column text-truncate">
                <h5 className="mt-0 text-truncate"><Link to={`/video/${video.id}`}>{video.snippet.title}</Link></h5>
                <span className="font-weight-lighter">
                    <Link to={`/channel/${video.snippet.channelId}`}>{video.snippet.channelTitle}</Link>
                </span>
                <span className="font-weight-lighter">Views: {numberWithCommas(video.statistics.viewCount)}</span>
                <div className="video-description text-truncate">
                    {video.snippet.description}
                </div>
            </div>
        </div>
    )
};
export default withRouter(YoutubeVideo);