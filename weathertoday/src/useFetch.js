import { useState, useEffect } from "react";
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";

const useFetch = (url) => {
  // Set up state for data
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        await axios
          .get(url)
          .then((response) => {
            setData(response.data);
            setIsPending(false);
          })
          .catch((error) => {
            throw error;
          });
      } catch (e) {
        setError(e.toJSON().message);
      }
    };
    fetchData(url);

    console.log("UseEffect runs");
  }, []);

  return { data, isPending, error };
};

export default useFetch;
