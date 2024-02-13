import { Outlet } from "react-router-dom";
import "./layout.scss";
import { PropsWithChildren } from "react";
import { ConfigProvider } from "antd/lib";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#52B788"
        },
        components: {
          Table: {
            headerBg: "#40916C",
            headerColor: "#fff",
            borderColor: "#52B788"
          },
        },
      }}
    >
      <div className="app-layout">
        <header className="app-header">
          <nav>
            <button className="app-header-menu-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
          </nav>
        </header>
        <div className="app-layout-body">
          {children}
          <Outlet />
        </div>
      </div>
    </ConfigProvider>
  );
};

export { Layout };
