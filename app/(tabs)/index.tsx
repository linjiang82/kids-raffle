import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View, Dimensions } from "react-native";
import { asyncStorage } from "../../common/storage/storage";

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
  const raffleCountKey = `${name}raffle`;
  const [count, setCount] = useState(0);
  const [raffleCount, setRaffleCount] = useState(0);

  useEffect(() => {
    const getBars = async () => {
      const bars = await asyncStorage.getItem(name);
      if (bars === undefined || bars === null) {
        asyncStorage.setItem(name, "0");
        setCount(0);
      } else {
        setCount(parseInt(bars));
      }
    };
    const getRaffle = async () => {
      const raffle = await asyncStorage.getItem(raffleCountKey);
      if (raffle === undefined || raffle === null) {
        setRaffleCount(0);
      } else {
        setRaffleCount(parseInt(raffle));
      }
    };
    getBars();
    getRaffle();
  }, []);

  const updateCount = () => {
    if (count < 0) return;
    const newCount = count + 1 >= 10 ? 0 : count + 1;
    // adding a raffle ticket
    if (newCount === 0) {
      asyncStorage.setItem(raffleCountKey, `${raffleCount + 1}`);
      setRaffleCount(raffleCount + 1);
    }
    setCount(newCount);
    asyncStorage.setItem(name, `${newCount}`);
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
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        {`Earned: ${raffleCount}`}
      </Text>
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
          {`${name} (${count})`}
        </Text>
      </View>
    </View>
  );
};
