// this service is used to resend the livecontent to the LivePage after /refresh_livepage route is called
// this service uses axios to make a get request to the /now_playing route and obtain the current song_id and verse_number
// after that, a get request is made to /preview route with the song_id and verse_number obtained from the /now_playing route
// the response from the /preview route is then sent in body to the post request to /projector route

const config = require("../config/config.js");
const axios = require("axios");

async function getIDandVerseNumber() {
    return axios({
        method: 'get',
        url: config.api_url + "/now_playing"
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
    });
}

async function getLyricsText(song_id, verse_number) {
    return axios({
        method: 'get',
        url: config.api_url + "/preview/" + song_id + "/" + verse_number
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
    }
    );
}

async function restart_projector(song_id, verse_number, live_content) {
    return axios({
        method: 'post',
        url: config.api_url + "/projector",
        data: {
            live_data: live_content,
            song_id: song_id,
            verse_number: verse_number
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
    }
    );
}


module.exports = async () => {
    let idAndVerseNumber = await getIDandVerseNumber();
    let lyricsText = await getLyricsText(idAndVerseNumber.song_id, idAndVerseNumber.verse_number);
    var json = JSON.parse(JSON.stringify(lyricsText));
    for (var i = 0; i < json.length; i++) {
        restart_projector(idAndVerseNumber.song_id, idAndVerseNumber.verse_number, json[i].lyrics_text);
    }
};