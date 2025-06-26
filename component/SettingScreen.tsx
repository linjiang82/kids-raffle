import { Button, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { useTicketCount } from "@/hooks/useTicketCount";
import { CandidatesList, Emma } from "@/common/constant";
import { ParticipantPicker } from "./ParticipantPicker";

export const SettingScreen = () => {
  const [selectedValue, setSelectedValue] = useState<CandidatesList>(Emma);
  const { incrementCount, decrementCount, ticketCount } =
    useTicketCount(selectedValue);
  return (
    <View style={styles.container}>
      <ParticipantPicker
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
      <View>
        <Text>Selected: {selectedValue}</Text>
        <Text>Current Tickets: {ticketCount}</Text>
        <Button onPress={incrementCount} title="Increment" />
        <Button onPress={decrementCount} title="Decrement" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
