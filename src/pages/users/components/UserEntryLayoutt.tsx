import { PropsWithChildren, useContext } from "react";
import Button from "antd/lib/button";
import { ArrowBack, CustomIcon } from "../../../components/icons";
import { UserPageContext } from "./UserPageContext";

const UserLayout = ({
  children,
  onGoBack,
}: PropsWithChildren<{ onGoBack: () => void }>) => {
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
        onClick={onGoBack}
      >
        Voltar
      </Button>
      {children}
    </div>
  );
};

const UserEntryLayout = ({ children }: PropsWithChildren) => {
  const { setEntry } = useContext(UserPageContext);

  return <UserLayout onGoBack={() => setEntry(null)}>{children}</UserLayout>;
};

export { UserEntryLayout, UserLayout };
