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

export enum MuscularGroupEnumNames {
  CHEST = "CHEST",
  BACK = "BACK",
  SHOULDERS = "SHOULDERS",
  BICEPS = "BICEPS",
  TRICEPS = "TRICEPS",
  ABS = "ABS",
  QUADRICEPS = "QUADRICEPS",
  HAMSTRINGS = "HAMSTRINGS",
  CALVES = "CALVES",
  GLUTES = "GLUTES",
}

const useMuscularGroupEnum = () => {
  const options = Object.entries(MuscularGroupEnum).map(([key, value]) => ({
    value: key,
    displayText: value,
  }));

  return { MuscularGroupEnum, options };
};

export { useMuscularGroupEnum };
