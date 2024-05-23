import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./pages/routes/Routes.index";
import { Provider } from "use-http";

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWV0cmVpbm8iLCJzdWIiOiJleGFtcGxlQGRvbWFpbi5jb20iLCJ1c2VyX2lkIjoiMTExMTExMTEtMTExMS0xMTExLTExMTEtMTExMTExMTExMTExIiwiZXhwIjoxNzE2NTA0ODkzfQ.7g9GWfyREi4PPWLTZmItWytrIFdY0XlE6fFL_j5lkyw";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
