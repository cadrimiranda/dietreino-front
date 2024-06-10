enum MuscularGroupEnum {
  CHEST = "CHEST",
  BACK = "BACK",
  SHOULDERS = "SHOULDERS",
  BICEPS = "BICEPS",
  TRICEPS = "TRICEPS",
  ABS = "ABS",
  QUADRICEPS = "QUADRICEPS",
  HAMSTRINGS = "HAMSTRINGS",
  CALVES = "CALVES",
}

const useMuscularGroupEnum = () => {
  const options = Object.keys(MuscularGroupEnum).map((key, value) => ({
    value: key,
    displayText: value,
  }));

  return { MuscularGroupEnum, options };
};

export { useMuscularGroupEnum };
