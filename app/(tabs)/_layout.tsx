import { Setting } from "@/component/Setting";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => <Setting />,
        }}
      />
      <Tabs.Screen
        name="raffle"
        options={{
          title: "Raffle",
          headerRight: () => <Setting />,
        }}
      />
    </Tabs>
  );
}
