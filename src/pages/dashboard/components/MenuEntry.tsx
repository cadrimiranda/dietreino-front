type MenuEntryProps = {
  title: string;
  icon: () => JSX.Element;
};

export const MenuEntry = ({ title, icon: Icon }: MenuEntryProps) => {
  return (
    <li className="menu-item-card">
      <button>
        <Icon />
        <p>{title}</p>
      </button>
    </li>
  );
};
