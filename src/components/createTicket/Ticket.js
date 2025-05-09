import { useEffect, useState } from "react";

export function useFetchTicket(url, options = {}) {
  const [data1, setData1] = useState();
  const [isError1, setIsError1] = useState(false);
  const [isLoading1, setIsLoading1] = useState(true);

  useEffect(() => {
    setData1(undefined);
    setIsError1(false);
    setIsLoading1(true);

    console.log("sometheng");

    const controller = new AbortController();

    // connect with the backend url
    fetch(url, { signal: controller.signal, ...options })
      // get the information and
      // and convert to json

      
      

      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        
        return Promise.reject(res);

      })

      // load it to the setData
      .then(setData1)

      // catch the error
      // set the error to true
      .catch((e) => {
        if (e.name === "AbortError") return;

        console.log(e);
        setIsError1(true);
      })

      // final
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading1(false);
      });

    return () => {
      controller.abort();
    };
  }, [options]);

  return { data1, isError1, isLoading1 };
}