const config = require("../config/config.js");
const axios = require("axios");

async function getTitlebySongID(song_id) {
    return axios({
        method: 'get',
        url: config.api_url + "/song/" + song_id
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
    }
    );
}

module.exports = async (song_id) => {
    let title = await getTitlebySongID(song_id);
    
    return title.song_title;
}