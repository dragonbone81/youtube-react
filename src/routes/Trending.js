import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import YoutubeVideo from '../components/YoutubeVideo';

class Trending extends Component {
    componentDidMount() {
        this.props.store.getTrendingVideos();
    }

    state = {
        bottom: false,
    };

    onScroll = async ({target}) => {
        if (((target.scrollHeight - target.scrollTop) <= (target.clientHeight + 1000)) &&
            (!this.state.bottom) && !this.props.store.reachedEndOfTrending) {
            this.setState({bottom: true});
            await this.props.store.getNextTrendingVideos();
            this.setState({bottom: false})
        }
    };

    render() {
        return (
            <div onScroll={this.onScroll} className="row trending-content">
                {this.props.store.trendingVideosArr.map(video => {
                    return (
                        <div key={video.id} className="col-md-12 col-sm-12 col-lg-12 col-xl-6 mt-3">
                            <YoutubeVideo video={video}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default inject("store")(observer(Trending));
