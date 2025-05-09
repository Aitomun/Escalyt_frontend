import { useEffect, useState } from "react";

export function useFetchCategory(url, token) {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData([]);
    setIsError(null);
    setIsLoading(true);

    const controller = new AbortController();

    fetch(url, {
      signal: controller.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({ status: res.status, statusText: res.statusText });
      })
      .then(setData)
      .catch((error) => {
        if (error.name === "AbortError") return;
        setIsError(error);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [url, token]);

  return { data, isError, isLoading };
}
