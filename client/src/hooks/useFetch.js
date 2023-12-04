import { useState, useEffect } from "react";

export const useFetch = (path) => {
  const [data, setData] = useState([{}]);
  const fetchPath = "http://localhost:4000/" + path;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchPath);
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [fetchPath]);

  const refetch = async () => {
    try {
      const response = await fetch(fetchPath);
      const newData = await response.json();
      setData(newData);
    } catch (err) {
      console.error(err);
    }
  };

  return { data, refetch };
};
