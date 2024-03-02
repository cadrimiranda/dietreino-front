import { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";

type MenuEntryProps = {
  title: string;
  icon: () => JSX.Element;
  description?: string;
  noNavigation?: boolean;
  to?: LinkProps["to"];
  handleClick?: (title: string, to?: LinkProps["to"]) => void;
};

const Span = ({ children }: PropsWithChildren) => <span>{children}</span>;

export const MenuEntry = ({
  title,
  icon: Icon,
  to,
  description,
  noNavigation,
  handleClick,
}: MenuEntryProps) => {
  let Element = Link;
  if (noNavigation) {
    // @ts-expect-error aaa
    Element = Span;
  }

  const onClick = () => {
    if (noNavigation && handleClick) {
      handleClick(title, to);
    }
  };

  return (
    <li className="menu-item-card" title={description} onClick={onClick}>
      <Element to={to || "#"}>
        <Icon />
        <p>{title}</p>
      </Element>
    </li>
  );
};
