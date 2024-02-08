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
        <MenuEntry icon={UserLage} title="Alunos" />
        <MenuEntry icon={Comments} title="Conversas" />
        <MenuEntry icon={CircleQuestion} title="FAQ" />
        <MenuEntry icon={FolderOpen} title="Presets" />
      </ul>
    </nav>
  );
};

export { DashboardPage };
