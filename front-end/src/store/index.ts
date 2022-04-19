import {createStore} from 'vuex';
import videoStateModule from './modules/video-state';
import {ThemeId} from '../models/theme-id';
import roomModule from "./modules/room";

interface State {
    themeId: ThemeId | null
}

const store = createStore<State>({
    modules: {videoStateModule, roomModule},
    actions: {
        sendHttpRequest: async (context, {url, responseType}) => {
            return new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.responseType = responseType;
                xhr.onload = async (event) => {
                    return resolve(xhr.response);
                };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                    });
                };
                xhr.open('GET', url);
                xhr.send();
            });
        },
    },
});

export default store;
