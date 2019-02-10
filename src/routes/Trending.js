import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import YoutubeVideo from '../components/YoutubeVideo';

class Trending extends Component {
    componentDidMount() {
        this.props.store.getTrendingVideos();
    }

    render() {
        return (
            <div className="row">
                {this.props.store.trendingVideos.map(video => {
                    return (
                        <div className="col-md-12 col-sm-12 col-lg-12 col-xl-6 mt-3">
                            <YoutubeVideo video={video}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default inject("store")(observer(Trending));
