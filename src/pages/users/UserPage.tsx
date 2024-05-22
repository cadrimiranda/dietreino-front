import { useState } from "react";
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
import { UserAnthropometricResults } from "./components/UserAnthropometricResults";

import "./userPage.scss";
import { UserDiet } from "./components/UserDiet";
import { UserGymPlan } from "./components/UserGymPlan";
import useGetUserByQueryParameter from "./hooks/useGetUserByQueryParameter";
import { Entries, UserPageContext } from "./components/UserPageContext";

const UserPage = () => {
  const [entry, setEntry] = useState<Entries | null>(null);
  const { user, loading } = useGetUserByQueryParameter();

  const navPage = (
    <nav>
      <ul className="dashboard-menu">
        <MenuEntry
          handleClick={() => setEntry(Entries.diet)}
          noNavigation
          icon={Utensils}
          title="Dieta"
        />
        <MenuEntry
          handleClick={() => setEntry(Entries.gymPlan)}
          noNavigation
          icon={Dumbbell}
          title="Treino"
        />
        <MenuEntry
          handleClick={() => setEntry(Entries.pills)}
          noNavigation
          icon={Capsules}
          title="Manipulados"
        />
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
        return (
          <UserDiet
            key={Entries.diet}
            uploadText="Clique ou arraste aqui a dieta"
            uploadHint="É possível fazer o upload de uma ou mais dieta simultaneas"
          />
        );
      case Entries.pills:
        return (
          <UserDiet
            key={Entries.pills}
            uploadText="Clique ou arraste aqui a prescrição"
            uploadHint="É possível fazer o upload de uma ou mais prescrições simultaneas"
          />
        );
      case Entries.gymPlan:
        return <UserGymPlan key={Entries.gymPlan} />;
      default:
        return navPage;
    }
  };

  return (
    <UserPageContext.Provider value={{ setEntry, user }}>
      {loading ? (
        <div className="loading">
          <p>Loading ...</p>
        </div>
      ) : (
        <div className="user-managment-page">
          {getEntryPage()}
          <UserAnthropometricResults />
        </div>
      )}
    </UserPageContext.Provider>
  );
};

export { UserPage };
