import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

class Home extends Component {
    componentDidMount() {
        // this.props.store.youtubeSearch("minecraft")
    }

    render() {
        return (
            <div>
                hi
            </div>
        );
    }
}

export default withRouter(inject("store")(observer(Home)));
