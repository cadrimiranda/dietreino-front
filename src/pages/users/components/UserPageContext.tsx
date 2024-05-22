import { createContext } from "react";
import { User } from "../hooks/useUserList";

enum Entries {
  diet = "diet",
  pills = "pills",
  gymPlan = "gymplan",
}

const UserPageContext = createContext<{
  setEntry: (_entry: Entries | null) => void;
  user?: User;
}>({
  setEntry: () => {},
});

export { UserPageContext, Entries };
