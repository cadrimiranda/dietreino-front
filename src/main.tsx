import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./pages/routes/Routes.index";
import { Provider } from "use-http";
import { ConfigProvider } from "antd";
import locale from "antd/locale/pt_BR";
import dayjs from "dayjs";

import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWV0cmVpbm8iLCJzdWIiOiJleGFtcGxlQGRvbWFpbi5jb20iLCJ1c2VyX2lkIjoiMTExMTExMTEtMTExMS0xMTExLTExMTEtMTExMTExMTExMTExIiwiZXhwIjoxNzE2ODIwNDIxfQ.NoZVAMdniedodtm0G8wZOSGIuMeZJTs550qebyHBxL4";

ReactDOM.createRoot(document.getElementById("root")!).render(
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
