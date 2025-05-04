import { StyleSheet } from "react-native";
import { CandidatesList } from "@/common/constant";
import { Picker } from "@react-native-picker/picker";

export const ParticipantPicker = ({
  selectedValue,
  setSelectedValue,
}: {
  selectedValue: CandidatesList;
  setSelectedValue: React.Dispatch<React.SetStateAction<"Emma" | "Emily">>;
}) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
      style={styles.picker}
    >
      {CandidatesList.map((candidate) => (
        <Picker.Item key={candidate} label={candidate} value={candidate} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: "auto",
    width: 150,
  },
});
