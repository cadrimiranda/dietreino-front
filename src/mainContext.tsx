import { createContext, useContext, useLayoutEffect, useState } from "react";
import { Provider } from "use-http";
import { LoginResponse } from "./utils/globalTypes";
import axios from "axios";

type MainContextType = {
  setTokenData: (tokenData: LoginResponse | null) => void;
  tokenData: LoginResponse | null;
};

const BASE_URL = import.meta.env.VITE_API_URL as string;
const MainContext = createContext<MainContextType | null>(null);

export const useMainContext = () => useContext(MainContext) as MainContextType;

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenData, setTokenData] = useState<LoginResponse | null>(null);

  useLayoutEffect(() => {
    axios.defaults.baseURL = BASE_URL;
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

  return (
    <MainContext.Provider value={{ setTokenData, tokenData }}>
      <Provider
        url={BASE_URL}
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
