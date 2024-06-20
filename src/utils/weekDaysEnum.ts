enum WeekDays {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

const WeekDayNames = {
  [WeekDays.SUNDAY]: "Domingo",
  [WeekDays.MONDAY]: "Segunda",
  [WeekDays.TUESDAY]: "Terça",
  [WeekDays.WEDNESDAY]: "Quarta",
  [WeekDays.THURSDAY]: "Quinta",
  [WeekDays.FRIDAY]: "Sexta",
  [WeekDays.SATURDAY]: "Sábado",
  "": "",
};

const weekDaysOptions: { value: WeekDays; label: string }[] = Object.keys(
  WeekDays
).map((key) => {
  const k = key as WeekDays;
  return {
    value: WeekDays[k],
    label: WeekDayNames[k],
  };
});

export { WeekDays, WeekDayNames, weekDaysOptions };
