import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const getData = async () => {
      const response = await fetch(url, { signal: controller.signal });
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    getData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading };
};

export default useFetch;
