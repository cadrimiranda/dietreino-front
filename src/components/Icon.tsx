/* eslint-disable @typescript-eslint/ban-ts-comment */
import { theme } from "antd/lib";
import { AliasToken } from "antd/lib/theme/internal";
import React from "react";
import * as Icons from "./icons";

type IconName = keyof typeof icons;

const icons = {
  trash: Icons.Trash,
  save: Icons.Save,
  pen: Icons.Pen,
  xmark: Icons.Xmark,
};

export const Icon = ({
  iconName,
  icon: Icon,
  color,
  ...rest
}: {
  color?: keyof AliasToken;
  icon?: (props: React.JSX.IntrinsicElements["svg"]) => React.JSX.Element;
  iconName?: IconName;
} & React.JSX.IntrinsicElements["svg"]) => {
  const { token } = theme.useToken();
  let fillColor = "black";
  // @ts-expect-error
  const tokenColor = token[color];
  if (typeof tokenColor === "string") {
    fillColor = tokenColor;
  }
  let IconComponent = Icon || Icons.Xmark;
  if (iconName && icons[iconName]) {
    IconComponent = icons[iconName];
  }

  return <IconComponent width="20px" fill={fillColor} {...rest} />;
};
