import AntdPopconfirm, { PopconfirmProps } from "antd/lib/popconfirm";

const PopconfirmWrapper = ({
  children,
  ...props
}: React.PropsWithChildren<PopconfirmProps>) => {
  return (
    <AntdPopconfirm okText="Sim" cancelText="Não" {...props}>
      {children}
    </AntdPopconfirm>
  );
};

export { PopconfirmWrapper };
