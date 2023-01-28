import { useEffect, useState } from "react";

const useGallery = (props) => {
  const { path, init } = props;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const fetcher = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(path, {
          ...init,
          headers: {
            ...init?.headers,
          },
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error("something went wrong");

        const data = await response.json();

        const cache = { data, timestamp: Date.now() };
        localStorage.setItem(path, JSON.stringify(cache));
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (localStorage.getItem(path)) {
      setIsLoading(true);
      const cache = JSON.parse(localStorage.getItem(path));

      const maxAge = 1000 * 60 * 5; /** 5 minutes */

      /** use cache if it hasn't been more than `maxAge` since it was cached */
      if (Date.now() - cache.timestamp < maxAge) {
        setIsLoading(false);
        setData(cache.data);
      } else {
        localStorage.removeItem(path);
        fetcher();
      }
    } else {
      fetcher();
    }

    return () => abortController.abort();
  }, [init, path]);

  return { data, isLoading, error };
};

export default useGallery;
