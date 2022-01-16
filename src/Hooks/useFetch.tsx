import { useEffect, useState } from "react";


export function useFetch<T>(url: string, init?: RequestInit):[T,boolean] {
  const [data, setData] = useState({} as T);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    const response = await fetch(url, init);
    const json = await response.json();

    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}
