import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import youtubeLogo from '../youtube-logo.svg';

class Sidebar extends Component {
    _handleKeyPress = ({key}) => {
        if (key === 'Enter') {
            this.props.store.youtubeSearch();
        }
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <div><img className="youtube-logo" src={youtubeLogo}/></div>
                        <div><h3 className="my-auto">Youtube</h3></div>
                    </div>
                </div>
                <div className="col-6 d-flex align-items-center">
                    <div className="input-group">
                        <input className="form-control no-glow"
                               onKeyPress={this._handleKeyPress}
                               onChange={({target}) => this.props.store.changeQuerySearchTerm(target.value)}
                               value={this.props.store.querySearchTerm}/>
                        <div onClick={this.props.store.youtubeSearch} className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i
                                className="fas fa-search"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col d-flex align-items-center text-center">Extra stuff</div>
            </div>

        );
    }
}

export default inject("store")(observer(Sidebar));
