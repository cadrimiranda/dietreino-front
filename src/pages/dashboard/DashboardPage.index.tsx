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
        <MenuEntry icon={UserLage} title="Alunos" to="users" />
        <MenuEntry icon={Comments} title="Conversas" to="chat" />
        <MenuEntry icon={CircleQuestion} title="FAQ" to="faq" />
        <MenuEntry icon={FolderOpen} title="Presets" to="presets" />
      </ul>
    </nav>
  );
};

export { DashboardPage };
