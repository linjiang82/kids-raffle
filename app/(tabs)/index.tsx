import { useCallback, useRef } from "react";
import { View, Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { BarColumn } from "@/component/BarColumn";
import {
  CongratsOverlay,
  CongratsOverlayRef,
} from "@/component/CongratsOverlay";
import { Emily, Emma } from "@/common/constant";

export default () => {
  const { height } = Dimensions.get("window");
  const confettiRef = useRef<ConfettiCannon>(null);
  const congratsRef = useRef<CongratsOverlayRef>(null);
  const triggerConfetti = useCallback((name: string) => {
    confettiRef.current?.start();
    congratsRef.current?.start(name);
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        height: height * 0.8,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <BarColumn name={Emma} />
      <BarColumn name={Emily} />

      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fadeOut
        ref={confettiRef}
      />
      <CongratsOverlay congratsRef={congratsRef} />
    </View>
  );
};
