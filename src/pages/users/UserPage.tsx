import { useState } from "react";
import { Clipboard, Dumbbell } from "../../components/icons";
import { MenuEntry } from "../dashboard/components/MenuEntry";
import "../dashboard/dashboardPage.scss";
import { UserAnthropometricResults } from "./components/UserAnthropometricResults";

import "./userPage.scss";
import { UserDiet } from "./components/UserDiet";
import useGetUserByQueryParameter from "./hooks/useGetUserByQueryParameter";
import { Entries, UserPageContext } from "./components/UserPageContext";
import { UserLayout } from "./components/UserEntryLayoutt";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../routes/Routes.index";
import { WorkoutPage } from "../workout/WorkoutPage";

const UserPage = () => {
  const navigate = useNavigate();
  const [entry, setEntry] = useState<Entries | null>(null);
  const { user, loading } = useGetUserByQueryParameter();

  const navPage = (
    <UserLayout onGoBack={() => navigate("/users")}>
      <nav>
        <ul className="dashboard-menu">
          {/* <MenuEntry
            handleClick={() => setEntry(Entries.diet)}
            noNavigation
            icon={Utensils}
            title="Dieta"
          /> */}
          <MenuEntry
            handleClick={() => setEntry(Entries.gymPlan)}
            noNavigation
            icon={Clipboard}
            title="Treino"
          />
          <MenuEntry
            to={`/${RoutesEnum.EXERCISES}`}
            icon={Dumbbell}
            title="Exercicios"
          />
          {/* <MenuEntry noNavigation icon={Clipboard} title="Anamnese" /> */}
        </ul>
      </nav>
    </UserLayout>
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
        return <WorkoutPage key={Entries.gymPlan} />;
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
