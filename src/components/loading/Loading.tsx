import { Spin } from "antd/lib";
import { PropsWithChildren, useState } from "react";
import "./Loading.scss";
import { LoadingContext } from "./LoadingContext";

function Loading({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {loading && (
        <div className="spin-content">
          <Spin size="large" />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export { Loading };
