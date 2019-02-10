import React from 'react'

const YoutubeVideo = ({video}) => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <div className="d-flex flex-row video-top-container">
            <div style={{backgroundImage: `url("${video.snippet.thumbnails.high.url}")`}}
                 className="align-self-start mr-3 video-image"/>
            <div className="d-flex flex-column text-truncate">
                <h5 className="mt-0 text-truncate">{video.snippet.title}</h5>
                <span className="font-weight-lighter">{video.snippet.channelTitle}</span>
                <span className="font-weight-lighter">Views: {numberWithCommas(video.statistics.viewCount)}</span>
                <div className="video-description text-truncate">
                    {video.snippet.description}
                </div>
            </div>
        </div>
    )
};
export default YoutubeVideo;