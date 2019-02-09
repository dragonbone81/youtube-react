import {decorate, configure, observable, action} from 'mobx'
import {youtubeSearch} from '../api/api'

configure({enforceActions: "observed"});

class Store {
    API_KEY = "AIzaSyDa3twZvyiLDhDQUFu8s-dScTYzp4AnVvY";
    querySearchTerm = "";
    changeQuerySearchTerm = (newTerm) => {
        this.querySearchTerm = newTerm;
    };
    youtubeSearch = () => {
        if (this.querySearchTerm !== "") {
            youtubeSearch(this.API_KEY, this.querySearchTerm);
        }
    };
}

decorate(Store, {
    querySearchTerm: observable,
    changeQuerySearchTerm: action,
});

export default new Store();