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
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();

    return () => abortController.abort();
  }, [init, path]);

  return { data, isLoading, error };
};

export default useGallery;
