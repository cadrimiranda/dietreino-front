import { PropsWithChildren, useContext } from "react";
import Button from "antd/lib/button";
import { UserPageContext } from "../UserPage";
import { ArrowBack, CustomIcon } from "../../../components/icons";

const UserEntryLayout = ({ children }: PropsWithChildren) => {
  const { setEntry } = useContext(UserPageContext);

  return (
    <div>
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
        onClick={() => setEntry(null)}
      >
        Voltar
      </Button>
      {children}
    </div>
  );
};

export { UserEntryLayout };
