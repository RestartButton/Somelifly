import Authorize from './Authorize.vue'
import Status from './Status.vue'

const isAuthorized = !!localStorage.getItem('spotify_access_token');

export function createModule() {
    return {
        id: 'spotify',
        title: 'Spotify',
        name: 'SpotifyCard',
        body: isAuthorized ? Status : Authorize
    };
}