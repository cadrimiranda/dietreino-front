import classNames from "classnames";
import { DateUtils } from "../../utils/dateUtils";

export const WITHOUT_WORKOUT = "Sem treino ativo";
export const WITHOUT_PLAN_EXPIRATION = "Sem data de expiração";
export const WITHOUT_NEXT_APPOINTMENT = "Sem consulta agendada";

export const tableCellRender = (
  text: string,
  defaultText = WITHOUT_WORKOUT
) => {
  const daysRemaining = DateUtils.getDaysLeft(text);
  const displayValue = outOfDate(text, defaultText);

  return colorBasedOnDays(displayValue, daysRemaining);
};

const outOfDate = (text?: string, defaultText = WITHOUT_WORKOUT) => {
  if (!text) return defaultText;

  let displayValue = DateUtils.formatDate(text);
  const daysRemaining = DateUtils.getDaysLeft(text);
  if (daysRemaining <= 0) {
    displayValue += " (Vencido)";
  } else {
    displayValue += ` (${daysRemaining} dias restantes)`;
  }

  return displayValue;
};

const colorBasedOnDays = (
  displayValue: string,
  daysRemaining: number,
  daysOffset = [7, 21]
) => {
  if (
    WITHOUT_WORKOUT === displayValue ||
    WITHOUT_PLAN_EXPIRATION === displayValue
  )
    return <span className="font-extrabold uppercase">{displayValue}</span>;

  const hasBgColor = daysRemaining <= daysOffset[1];

  const cx = classNames({
    "bg-yellow-500":
      daysRemaining > daysOffset[0] && daysRemaining <= daysOffset[1],
    "bg-red-500": daysRemaining <= daysOffset[0],
    "p-1": hasBgColor,
    "rounded-lg": hasBgColor,
    "text-white": hasBgColor,
    "font-bold": hasBgColor,
  });

  return <span className={cx}>{displayValue}</span>;
};
