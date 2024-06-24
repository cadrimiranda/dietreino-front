import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./pages/routes/Routes.index";
import dayjs from "dayjs";
import "./main.css";

import "dayjs/locale/pt-br";
import { MainProvider } from "./mainContext";

dayjs.locale("pt-br");

const MainComponent = () => {
  return (
    <React.StrictMode>
      <MainProvider>
        <Routes />
      </MainProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<MainComponent />);
