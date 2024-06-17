import { Rule } from "antd/lib/form";

type Fields = "name" | "description";

export const exerciseFormRules: Record<Fields, Rule[]> = {
  name: [
    { required: true, message: "Insira o nome do exercício" },
    {
      max: 50,
      message: "O nome do exercício deve ter no máximo 50 caracteres",
    },
    {
      min: 3,
      message: "O nome do exercício deve ter no mínimo 3 caracteres",
    },
  ],
  description: [
    {
      max: 150,
      message: "A descrição deve ter no máximo 150 caracteres",
    },
  ],
};
