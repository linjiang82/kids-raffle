import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, View, Dimensions } from "react-native";
import { mmkvStorage } from "../../common/storage/storage";

export default () => {
  const { height } = Dimensions.get("window");
  return (
    <View
      style={{
        flexDirection: "row",
        height: height * 0.8,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <BarColumn name="Emma" />
      <BarColumn name="Emily" />
    </View>
  );
};

const BarColumn = ({ name }: { name: string }) => {
  let bars = mmkvStorage.getItem(name);
  if (bars === undefined || typeof bars !== "number") {
    mmkvStorage.setItem(name, 0);
    bars = 0;
  }
  const [count, setCount] = useState(bars);

  const updateCount = () => {
    setCount(count + 1);
    mmkvStorage.setItem(name, count + 1);
  };
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          height: "80%",
        }}
      >
        {Array.from({ length: count })
          .map((_, i) => {
            const colorValue = Math.floor((255 / count) * i);
            return (
              <View
                key={i}
                style={{
                  height: 10,
                  width: 30 + i * 10,
                  backgroundColor: `rgb(0, ${colorValue},  255)`,
                  margin: 5,
                }}
              />
            );
          })
          .reverse()}
      </View>

      <View>
        <View style={{ marginTop: 10 }}>
          <Button title="Add" onPress={updateCount} />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
          {name}
        </Text>
      </View>
    </View>
  );
};
