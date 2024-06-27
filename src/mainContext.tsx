import { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "use-http";
import { LoginResponse } from "./utils/globalTypes";
import axios from "axios";

type MainContextType = {
  setTokenData: (tokenData: LoginResponse | null) => void;
  tokenData: LoginResponse | null;
};

const MainContext = createContext<MainContextType | null>(null);

export const useMainContext = () => useContext(MainContext) as MainContextType;

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenData, setTokenData] = useState<LoginResponse | null>(null);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);
  const BASE_URL = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    console.log("BASE_URL", BASE_URL);
    axios.defaults.baseURL = BASE_URL;
    setBaseUrl(BASE_URL);
    const data = localStorage.getItem("tokenData");

    if (data) {
      const _tokenData = JSON.parse(data) as LoginResponse;
      axios.defaults.headers.Authorization = `Bearer ${_tokenData.token}`;
      setTokenData(_tokenData);
      localStorage.removeItem("tokenData");
    }

    return () => {
      if (tokenData) {
        localStorage.setItem("tokenData", JSON.stringify(tokenData));
      }
    };
  }, []);

  useEffect(() => {
    if (tokenData) {
      axios.defaults.headers.Authorization = `Bearer ${tokenData.token}`;
    }
  }, [tokenData]);

  return (
    <MainContext.Provider value={{ setTokenData, tokenData }}>
      <Provider
        url={baseUrl as string}
        options={{
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        }}
      >
        {children}
      </Provider>
    </MainContext.Provider>
  );
};
