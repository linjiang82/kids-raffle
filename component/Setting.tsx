import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

export const Setting = () => {
  const router = useRouter();
  const openModal = () => router.push("/settingModal");

  return (
    <Icon
      name="settings"
      size={24}
      color="black"
      onPress={() => openModal()}
      style={{
        marginRight: 20,
      }}
    />
  );
};
