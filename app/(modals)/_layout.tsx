import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="settingModal"
        options={{
          title: "Settings",
          headerShown: true,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
