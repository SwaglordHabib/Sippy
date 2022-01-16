import { useEffect, useState } from "react";
import { Api_Auth } from "../Router/Api_Routes";
import history from "../Router/history";

export const HTTP_OPTIONS: RequestInit = {
  method: "GET",
  mode: "cors",
  headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  credentials: "include",
};

export function useAuth() {
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    const response = await fetch(
      Api_Auth,
      HTTP_OPTIONS
    );

    switch (response.status) {
      case 200:
        history.push("/");
        break;
      case 400:
      case 401:
      case 403:
      default:
        break;
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [loading];
}
