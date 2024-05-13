/* eslint-disable @typescript-eslint/ban-ts-comment */
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
export * from "./Capsules";
export * from "./Clipboard";
export * from "./ClockRotateLeft";
export * from "./Plus";
export * from "./Inbox";
export * from "./ArrowBack";
export * from "./Pen";
export * from "./AngleRight";
export * from "./Save";

export const CustomIcon = ({
  icon: Icon,
  color,
  ...rest
}: {
  color?: keyof AliasToken;
  icon: (props: React.JSX.IntrinsicElements["svg"]) => React.JSX.Element;
} & React.JSX.IntrinsicElements["svg"]) => {
  const { token } = theme.useToken();
  let fillColor = "black";
  // @ts-expect-error
  const tokenColor = token[color];
  if (typeof tokenColor === "string") {
    fillColor = tokenColor;
  }

  return <Icon fill={fillColor} {...rest} />;
};
