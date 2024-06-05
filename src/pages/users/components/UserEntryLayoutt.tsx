import { PropsWithChildren, useContext } from "react";
import Button from "antd/lib/button";
import { ArrowBack, CustomIcon } from "../../../components/icons";
import { UserPageContext } from "./UserPageContext";

interface Props {
  actionsButtons?: React.JSX.Element;
}

interface LayoutProps extends Props {
  onGoBack: () => void;
}

const UserLayout = ({
  children,
  onGoBack,
  actionsButtons,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <div className="user-entry-layout">
      <div className="df-aic layout-buttons">
        <Button
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
        {actionsButtons}
      </div>
      {children}
    </div>
  );
};

const UserEntryLayout = ({
  children,
  actionsButtons,
}: PropsWithChildren<Props>) => {
  const { setEntry } = useContext(UserPageContext);

  return (
    <UserLayout actionsButtons={actionsButtons} onGoBack={() => setEntry(null)}>
      {children}
    </UserLayout>
  );
};

export { UserEntryLayout, UserLayout };
