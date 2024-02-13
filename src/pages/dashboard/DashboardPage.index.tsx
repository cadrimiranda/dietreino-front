import {
  CircleQuestion,
  Comments,
  FolderOpen,
  UserLage,
} from "../../components/icons";
import { MenuEntry } from "./components/MenuEntry";
import "./dashboardPage.scss";

const DashboardPage = () => {
  return (
    <nav>
      <ul className="dashboard-menu">
        <MenuEntry icon={UserLage} title="Alunos" to="profissional/users" />
        <MenuEntry icon={Comments} title="Conversas" to="profissional/chat" />
        <MenuEntry icon={CircleQuestion} title="FAQ" to="profissional/faq" />
        <MenuEntry icon={FolderOpen} title="Presets" to="profissional/presets" />
      </ul>
    </nav>
  );
};

export { DashboardPage };
