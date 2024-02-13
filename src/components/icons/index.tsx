import { theme } from "antd/lib";
import { AliasToken } from "antd/lib/theme/internal";
import React from "react";

export * from "./CircleQuestion";
export * from "./Comments";
export * from "./Dumbbell";
export * from "./FolderOpen";
export * from "./UserLarge";
export * from "./Utensils";
export * from "./MagnifyingGlass";

export const CustomIcon = ({
  icon: Icon,
  color,
}: {
  color: keyof AliasToken;
  icon: (props: React.JSX.IntrinsicElements["svg"]) => React.JSX.Element;
}) => {
  const { token } = theme.useToken();
  let fillColor = "black";
  const tokenColor = token[color];
  if (typeof tokenColor === "string") {
    fillColor = tokenColor;
  }

  return <Icon fill={fillColor} />;
};
