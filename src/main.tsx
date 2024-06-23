import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./pages/routes/Routes.index";
import { Provider } from "use-http";
import { ConfigProvider } from "antd";
import locale from "antd/locale/pt_BR";
import dayjs from "dayjs";
import "./main.css";

import "dayjs/locale/pt-br";
import axios from "axios";

dayjs.locale("pt-br");

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWV0cmVpbm8iLCJzdWIiOiJqYW5lLmRvZUBleGFtcGxlLmNvbSIsInVzZXJfaWQiOiIyMjIyMjIyMi0yMjIyLTIyMjItMjIyMi0yMjIyMjIyMjIyMjIiLCJleHAiOjE3MTkxNTQ3NzV9.PuTkf3mgEOJMUPmEBKaBZ1FweWS3S42rZnQUWc3iIAM";

const MainComponent = () => {
  axios.defaults.baseURL = "http://localhost:8080";
  axios.defaults.headers.common["Authorization"] = `Bearer ${mockToken}`;

  return (
    <React.StrictMode>
      <ConfigProvider locale={locale}>
        <Provider
          url="http://localhost:8080"
          options={{
            headers: {
              Authorization: `Bearer ${mockToken}`,
            },
          }}
        >
          <Routes />
        </Provider>
      </ConfigProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<MainComponent />);
