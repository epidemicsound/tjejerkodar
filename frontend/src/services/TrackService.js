import { BASE_URL } from "../player.config";
import fetcher from "./fetcher";

// Get track mp3 url to use in player for playback:
export const getTrackUrl = async (trackId) => {
    const userToken = localStorage.getItem('userToken');

    try {
        const data = await fetcher(`${BASE_URL}/tracks/${trackId}/download?format=mp3`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }, 3);
        return data;

    } catch (err) {
        console.log("There's an error in getTrackUrl", err);
        console.error(err);
        return err;
    }

};

export const getMoodsAndGenres = async () => {
    const userToken = localStorage.getItem('userToken');

    try {
        const data = await fetcher(`${BASE_URL}/tracks/parameters`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }, 3);
        return data;

    } catch (err) {
        console.log("There's an error in getMoodsAndGenres", err);
        console.error(err);
        return err;
    }
};

export const getFilteredTracks = async (moods, genres) => {
    const userToken = localStorage.getItem('userToken');
    let hasMoods = moods.length > 0;
    let hasGenres = genres.length > 0;
    let queryString = "";

    let moodsQuery = "";
    let genresQuery = "";

    if (hasMoods) {
        // moodsQuery = moods.map(mood => `mood[]=${mood}`).join('&');
        moodsQuery = moods.map(mood => `mood=${mood}`).join('&');
        queryString += moodsQuery;
    }
    if (hasGenres) {
        // genresQuery = genres.map(genre => `genre[]=${genre}`).join('&');
        genresQuery = genres.map(genre => `genre=${genre}`).join('&');

        if (hasMoods && hasGenres) {
            queryString += "&";
        } else {
            queryString += genresQuery;
        }
    }

    try {
        const data = await fetcher(`${BASE_URL}/tracks?${queryString}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }, 3);
        return data;
    } catch (error) {
        console.log("There's an error in getFilteredTracks", error);
        console.error(error);
        return error;
    }

};

export const formatSongTime = (num) => {
    let numArray = String(num).split("").map((num) => {
        return Number(num)
    })
    let seconds = numArray.splice(-2).join("");
    let min = numArray.join("");
    let time = ''
    if (seconds.length === 1) seconds = `0${seconds}`
    if (min.length === 1) min = `0${min}`
    if (min !== '') {
        time = `${min}:${seconds}`
    } else {
        time = `00:${seconds}`;
    }
    return time;
}

export const formatArtistsList = (track) => {
    let main = track.mainArtists.map((artist) => artist).join(", ");
    let featured = track.featuredArtists.map((artist) => artist).join(", ");
    let artists = `${main} ${featured ? `(feat. ${featured})` : ''}`;
    return artists;
}
