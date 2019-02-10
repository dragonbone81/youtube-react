import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

class VideoPage extends Component {
    componentDidMount() {
        // this.props.store.youtubeSearch("minecraft")
    }

    BASE_EMBED_URL = 'https://www.youtube.com/embed';

    render() {
        return (
            <div>
                <iframe frameBorder='0'
                        allow='autoplay; encrypted-media' allowFullScreen title='video'
                        src={`${this.BASE_EMBED_URL}/${this.props.store.currentVideo || this.props.match.params.video_id}`}/>
            </div>
        );
    }
}

export default withRouter(inject("store")(observer(VideoPage)));
