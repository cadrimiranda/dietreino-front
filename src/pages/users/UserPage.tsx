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

import './userPage.scss'

const UserPage = () => {
  return (
    <div className="user-managment-page">
      <UserDetails />
      <nav>
        <ul className="dashboard-menu">
          <MenuEntry icon={Utensils} title="Dieta" to="profissional/users" />
          <MenuEntry icon={Dumbbell} title="Treino" to="profissional/chat" />
          <MenuEntry
            icon={Capsules}
            title="Manipulados"
            to="profissional/faq"
          />
          <MenuEntry
            icon={Clipboard}
            title="Anamnese"
            to="profissional/presets"
          />
          <MenuEntry
            icon={ClockRotateLeft}
            title="Histórico/Fotos"
            to="profissional/presets"
          />
          <MenuEntry icon={Comments} title="Chat" to="profissional/presets" />
          <MenuEntry
            icon={CommentDots}
            title="Treinador"
            to="profissional/presets"
          />
        </ul>
      </nav>
    </div>
  );
};

export { UserPage };
