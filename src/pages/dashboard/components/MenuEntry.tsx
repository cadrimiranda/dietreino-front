import { Link, LinkProps } from "react-router-dom";

type MenuEntryProps = {
  title: string;
  icon: () => JSX.Element;
  description?: string;
} & Pick<LinkProps, "to">;

export const MenuEntry = ({
  title,
  icon: Icon,
  to,
  description,
}: MenuEntryProps) => {
  return (
    <li className="menu-item-card" title={description}>
      <Link to={to}>
        <Icon />
        <p>{title}</p>
      </Link>
    </li>
  );
};
