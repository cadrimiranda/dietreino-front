import { createContext, useState } from "react";
import {
  Capsules,
  Clipboard,
  ClockRotateLeft,
  Comments,
  Dumbbell,
  Utensils,
} from "../../components/icons";
import { CommentDots } from "../../components/icons/CommentsDot";
import { MenuEntry } from "../dashboard/components/MenuEntry";
import "../dashboard/dashboardPage.scss";
import { UserDetails } from "./components/UserDetails";

import "./userPage.scss";
import { UserDiet } from "./components/UserDiet";

enum Entries {
  diet = "diet",
}

export const UserPageContext = createContext<{
  setEntry: (_entry: Entries | null) => void;
}>({
  setEntry: () => {},
});

const UserPage = () => {
  const [entry, setEntry] = useState<Entries | null>(null);

  const navPage = (
    <nav>
      <ul className="dashboard-menu">
        <MenuEntry
          handleClick={() => setEntry(Entries.diet)}
          noNavigation
          icon={Utensils}
          title="Dieta"
        />
        <MenuEntry noNavigation icon={Dumbbell} title="Treino" />
        <MenuEntry noNavigation icon={Capsules} title="Manipulados" />
        <MenuEntry noNavigation icon={Clipboard} title="Anamnese" />
        <MenuEntry
          noNavigation
          icon={ClockRotateLeft}
          title="Histórico/Fotos"
        />
        <MenuEntry noNavigation icon={Comments} title="Chat" />
        <MenuEntry noNavigation icon={CommentDots} title="Treinador" />
      </ul>
    </nav>
  );

  const getEntryPage = () => {
    switch (entry) {
      case Entries.diet:
        return <UserDiet />;
      default:
        return navPage;
    }
  };

  return (
    <UserPageContext.Provider value={{ setEntry }}>
      <div className="user-managment-page">
        <UserDetails />
        {getEntryPage()}
      </div>
    </UserPageContext.Provider>
  );
};

export { UserPage };
