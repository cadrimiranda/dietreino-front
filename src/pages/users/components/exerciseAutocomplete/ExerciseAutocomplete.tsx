import { useState } from "react";
import AutoComplete, { AutoCompleteProps } from "antd/lib/auto-complete";
import useExerciseAutocomplete from "../../hooks/useExerciseAutocomplete";

export const ExerciseAutocomplete = ({
  onChange,
  onSelect,
  value = "",
}: Pick<
  AutoCompleteProps<string, { label: string; value: string }>,
  "onChange" | "onSelect" | "value"
>) => {
  const { fetchAutocomplete, results } = useExerciseAutocomplete();
  const [exerciseName, setExerciseName] = useState(value);

  return (
    <AutoComplete
      size="small"
      style={{ width: "200px" }}
      backfill
      allowClear
      options={results}
      value={exerciseName}
      onSelect={(_, option: { label: string; value: string }) => {
        onSelect?.(option.value, option);
        setExerciseName(option.label);
      }}
      onChange={(value: string, option) => {
        onChange?.(value, option);
        fetchAutocomplete(value);
        if (!Array.isArray(option)) {
          setExerciseName(option.label);
        }
      }}
    />
  );
};
