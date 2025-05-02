import { PASSWORD } from "@/common/constant";
import { SettingScreen } from "@/component/SettingScreen";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

export default function Modal() {
  const [password, setPassword] = useState("");

  const isAdminVisible = password === PASSWORD;

  const content = isAdminVisible ? (
    <SettingScreen />
  ) : (
    <TextInput
      style={styles.input}
      onChangeText={setPassword}
      placeholder="Enter password"
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>{content}</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "80%",
  },
});
