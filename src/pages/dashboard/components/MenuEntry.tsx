import { Link, LinkProps } from "react-router-dom";

type MenuEntryProps = {
  title: string;
  icon: () => JSX.Element;
} & Pick<LinkProps, "to">;

export const MenuEntry = ({ title, icon: Icon, to }: MenuEntryProps) => {
  return (
    <li className="menu-item-card">
      <Link to={to}>
        <Icon />
        <p>{title}</p>
      </Link>
    </li>
  );
};
