const clientId = '26e2992c0de34b808f64df62f23910e7';
let accessToken = '';
const redirectUri = 'http://localhost:3000/';
const url = window.location.href;


let Spotify = {
    getAccessToken: function (term) {
        console.log("greien starter");
        if (accessToken) {
            console.log("Vi har en token");
            return accessToken;
        };

        accessToken = url.match(/access_token=([^&]*)/);
        let expiresIn = url.match(/expires_in=([^&]*)/);

        if (accessToken && expiresIn) {
            console.log("test");
            accessToken = accessToken[1];
            expiresIn = expiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            console.log("På jakt etter Token");
            const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirectUri}`;
            window.location.assign(spotifyURL);
        }
    },

    search: function (term) {
        console.log("søkefunksjon starter, men uten accessToken tydeligvis. Edit: funker nå");
        let spotifyEndpoint = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term}&limit=5`;
        // Magien skjer her, at vi endelig får tilgang til accessToken
        this.getAccessToken(term);
        return fetch(spotifyEndpoint,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed');
            }, networkError => console.log(networkError.message)
            ).then(jsonResponse => {
                jsonResponse.tracks.items.map(track => {
                    console.log(jsonResponse.tracks.items[1]);
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                    }
                });
            }
            )
    },

    savePlaylist(playlistName, trackUri) {
        if (playlistName && trackUri) {

        } else return;

        let userID = '';
        const meEndpoint = 'https://api.spotify.com/v1/me';
        fetch(meEndpoint, {
            headers: { Authorization: `Bearer ${accessToken}`, },
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(jsonResponse => {
            userID = jsonResponse.id;

            const playlistCreateURL = `https://api.spotify.com/v1/users/${userID}/playlists`;
            let playlistID = '';
            fetch(playlistCreateURL, {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json', },
                body: JSON.stringify({ name: playlistName, }),
            }
            ).then(response => {
                if (response) {
                    return response.json()
                };
            }).then(playlist => {
                playlistID = playlist.id;

                const addToPlaylistURL = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
                fetch(addToPlaylistURL, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json', },
                    body: JSON.stringify({ uris: trackUri, }),
                })
            });
        });
    },

}




export default Spotify;