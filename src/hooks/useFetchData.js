// This is the custom hook, used to get the data. This custom hook includes useEffect to fetch the data and also defines all the states in this context and returns as an object. 

import { useState, useEffect } from "react";

const useFetchData = (url) => {
    const [data, setData] = useState(null); // const [data, setData] = useState([]);  alternative, in this case don't need null check.
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // use effect hook. 
    // empty array is used as second param to pass dependecies to watch for. 
    useEffect(() => {

        // abort controller is used to abort fetching data when the component enclosing this is not rendered by the dom. When we abort a fetch, fetch returns an error, we should handle that error not not update the state. 
        const abortCtrl = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCtrl.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error("[ERROR] " + res.url + " " + res.status + " " + res.statusText);
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log("stoping the fetch.");
                    } else {
                        setError(err.message);
                        setIsLoading(false);
                    }
                });
        }, 500);

        return () => abortCtrl.abort(); // this is gonna pause the fetch. 
    }); // useEffect is called when url changes. 
    return { data, isLoading, error };
}

export default useFetchData;