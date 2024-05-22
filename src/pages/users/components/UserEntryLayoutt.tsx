import { PropsWithChildren, useContext } from "react";
import Button from "antd/lib/button";
import { ArrowBack, CustomIcon } from "../../../components/icons";
import { UserPageContext } from "./UserPageContext";

const UserEntryLayout = ({ children }: PropsWithChildren) => {
  const { setEntry } = useContext(UserPageContext);

  return (
    <div className="user-entry-layout">
      <Button
        style={{ marginBottom: "16px" }}
        icon={
          <CustomIcon
            icon={ArrowBack}
            color="colorWhite"
            width="1rem"
            height="1rem"
          />
        }
        size="large"
        onClick={() => setEntry(null)}
      >
        Voltar
      </Button>
      {children}
    </div>
  );
};

export { UserEntryLayout };
