// this service is used to resend the livecontent to the LivePage after /refresh_livepage route is called
// this service uses axios to make a get request to the /now_playing route and obtain the current song_id and verse_number
// after that, a get request is made to /preview route with the song_id and verse_number obtained from the /now_playing route
// the response from the /preview route is then sent in body to the post request to /projector route

const config = require("../config/config.js");
const axios = require("axios");

module.exports = function () {
// make a request to the /now_playing route and obtain the current song_id and verse_number
axios.get(config.api_url + "/now_playing")
    .then(response => {
        // make a request to the /preview route with the song_id and verse_number obtained from the /now_playing route
        axios.get(config.api_url + `/preview/${response.data.song_id}/${response.data.verse_number}`)
            .then(response => {
                // "song_id": "song_id",
                // "lyrics_text": "Example vers vers vers number 1",
                // "verse_number": 1,
                // "_id": "verse _id"
                // send the response in body to the post request to /projector route
                axios.post(config.api_url + "/projector", {
                    live_data: response.data.lyrics_text,
                    song_id: response.data.song_id,
                    verse_number: response.data.verse_number
                })
                    .then(response => {
                        console.log("Live content sent to the projector");
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                        console.log("Live content sent to the projector");
                    }
                );
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                console.log("Live content sent to the projector");
            }
        );
    }).catch(error => {
        console.log(error);
    }
);

};