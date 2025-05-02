import { useTicketCount } from "@/hooks/useTicketCount";
import { View, Text } from "react-native";

export const BarColumn = ({ name }: { name: string }) => {
  const { ticketCount } = useTicketCount(name);

  const raffleCount = ticketCount % 10;
  const count = Math.floor(ticketCount / 10);

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
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
          {`${name} (${count})`}
        </Text>
      </View>
    </View>
  );
};
