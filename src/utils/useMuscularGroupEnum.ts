export enum MuscularGroupEnum {
  CHEST = "Peito",
  BACK = "Costas",
  SHOULDERS = "Ombro",
  BICEPS = "Biceps",
  TRICEPS = "Triceps",
  ABS = "Abdominal",
  QUADRICEPS = "Quadriceps",
  HAMSTRINGS = "Posterior da coxa",
  CALVES = "Panturrilha",
  GLUTES = "Glúteos",
}

const useMuscularGroupEnum = () => {
  const options = Object.entries(MuscularGroupEnum).map(([key, value]) => ({
    value: key,
    displayText: value,
  }));

  return { MuscularGroupEnum, options };
};

export { useMuscularGroupEnum };
