//this is basically a cutsom hook allowing us to make API calls with lesser code
import { useEffect, useState } from "react";
import { fetchApiData } from "../utils/api";
const useFetch = (url) => {
    //creating states and assigning default values
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    //using useEffect hook to call API
    useEffect(() => {
        //setting initial values
        setLoading("loading...");
        setData(null);
        setError(null);

        //getting data from API
        fetchApiData(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};
//exporting the function
export default useFetch;