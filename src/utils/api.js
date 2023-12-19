import axios from 'axios';

//declaring the API key
// const apiKey = process.env.REACT_APP_NEWS_API
const apiKey = "d201050bd524332ba636f32aaa78750e"; //HIDE THIS!

//declaring a base URL for the api
const baseUrl = `https://api.themoviedb.org/3/`;

//const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzZiMzRiMmUxMDVmYTQyMDZmMDlmNjFkZmQ0OGYzOCIsInN1YiI6IjY1M2QxNGI1MTA5Y2QwMDE0ZGY0NTQyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cnpxW6AFFrNlmVSZWuPu8zq0fxQ44ka89MBEwXh69Nw";
//const tmdbToken = import.meta.env.REACT_APP_TMDB_TOKEN;
// const headers = {
//     Authorization: "bearer " + tmdbToken,
// };

//function to fetch data from the api
export const fetchApiData = async (url)=>{
    try {
        const response = await axios.get(baseUrl + url + `?api_key=${apiKey}`);
        //using axios, te data is already converted to json, we only need to 
        //extract data out of it
        return response.data;
    } catch (error) {
        console.log("Error contacting the API, the server says: " + error);
        return error;
    }
};