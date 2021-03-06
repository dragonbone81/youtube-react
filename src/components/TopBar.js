import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import youtubeLogo from '../youtube-logo.svg';
import {withRouter} from 'react-router-dom';

class Sidebar extends Component {
    _handleKeyPress = ({key}) => {
        if (key === 'Enter') {
            this.props.store.youtubeSearch();
        }
    };

    render() {
        return (
            <div className="d-flex sticky-top">
                <div className="d-flex align-items-center mr-4">
                    <div><img className="youtube-logo" src={youtubeLogo}/></div>
                    <div><h3 className="my-auto">Youtube</h3></div>
                </div>
                <div className="input-box-search d-flex ml-5 mr-5 flex-grow-1 align-items-center justify-content-start">
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
                <div className="d-flex ml-auto align-items-center justify-content-end">
                    {!this.props.store.loggedIn && <div onClick={this.props.store.loginRedirect} className="login-text">
                        <h5 className="my-auto">Login</h5>
                    </div>}
                </div>
            </div>

        );
    }
}

export default withRouter(inject("store")(observer(Sidebar)));
