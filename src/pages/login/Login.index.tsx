import Form from "antd/lib/form";
import "./login.scss";
import Input from "antd/lib/input";
import { useLoading } from "../../utils/useLoading";
import axios, { isAxiosError } from "axios";
import { LoginResponse } from "../../utils/globalTypes";
import { useState } from "react";
import { useMainContext } from "../../mainContext";
import { DateUtils } from "../../utils/dateUtils";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type Fields = {
  email: string;
  password: string;
};

type LoginRawResponse = Omit<LoginResponse, "expiresAt"> & {
  expiresAt: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const { setTokenData } = useMainContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form] = Form.useForm<Fields>();
  const { load, loading } = useLoading();

  const handleSubmit = () => {
    load(
      axios
        .post<LoginRawResponse>("auth/login", form.getFieldsValue())
        .then((res) => {
          if (isAxiosError(res)) {
            setErrorMessage(res.response?.data.errorMessage);
            return;
          }

          setTokenData({
            ...res.data,
            expiresAt: DateUtils.toDayJS(res.data.expiresAt) as dayjs.Dayjs,
          });
          navigate("/");
        })
    );
  };

  return (
    <div className="login-brackground h-screen flex justify-center items-center flex-col bg-transparent">
      <h1 className="w-10/12 text-center text-white mb-8 font-semibold text-4xl">
        Bem vindo
      </h1>
      <Form
        form={form}
        onFinish={handleSubmit}
        className="flex items-center justify-center flex-col"
        disabled={loading}
      >
        <Form.Item
          validateStatus={errorMessage ? "error" : undefined}
          help={errorMessage ? errorMessage : undefined}
          name="email"
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input
            className="w-80 h-10"
            placeholder="email@consultoria.com"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input className="w-80 h-10" placeholder="Senha" type="password" />
        </Form.Item>
        <button
          disabled={loading}
          type="submit"
          className="bg-gradient-to-b from-green-700 to-color-primary-dark text-white font-medium rounded-lg shadow-md px-12 py-3 focus:bg-gradient-to-b focus:from-color-primary focus:to-color-primary-dark focus:shadow-lg active:bg-gradient-to-b active:from-color-primary active:to-color-primary-dark active:shadow-lg"
        >
          Login
        </button>
      </Form>
    </div>
  );
}

export { LoginPage };
