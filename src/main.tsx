import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./pages/routes/Routes.index";
import { Provider } from "use-http";

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkaWV0cmVpbm8iLCJzdWIiOiJleGFtcGxlQGRvbWFpbi5jb20iLCJleHAiOjE3MTUxNzI5ODd9.u6pv6ggciRmeuhafLYvHzZ4MXmEygzwHm7lCL4ceTr8";

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
