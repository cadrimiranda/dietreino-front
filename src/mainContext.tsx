import { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "use-http";
import { ConfigProvider } from "antd";
import locale from "antd/locale/pt_BR";
import dayjs from "dayjs";
import { LoginResponse } from "./utils/globalTypes";
import axios from "axios";

dayjs.locale("pt-br");

type MainContextType = {
  setTokenData: (tokenData: LoginResponse | null) => void;
  tokenData: LoginResponse | null;
};

const BASE_URL = import.meta.env.VITE_API_URL as string;
const MainContext = createContext<MainContextType | null>(null);

export const useMainContext = () => useContext(MainContext) as MainContextType;

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenData, setTokenData] = useState<LoginResponse | null>(null);

  useEffect(() => {
    axios.defaults.baseURL = BASE_URL;
    const data = localStorage.getItem("tokenData");

    if (data) {
      setTokenData(JSON.parse(data));
      localStorage.removeItem("tokenData");
    }

    return () => {
      if (tokenData) {
        localStorage.setItem("tokenData", JSON.stringify(tokenData));
      }
    };
  }, []);

  useEffect(() => {
    if (tokenData && tokenData.token) {
      axios.defaults.headers.Authorization = `Bearer ${tokenData.token}`;
    }
  }, [tokenData]);

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
        <ConfigProvider locale={locale}>{children}</ConfigProvider>
      </Provider>
    </MainContext.Provider>
  );
};
