import React, { useState, useRef, useImperativeHandle } from "react";
import { Text, StyleSheet, Animated } from "react-native";

export type CongratsOverlayRef = { start: (name: string) => void } | null;

export const CongratsOverlay = ({
  congratsRef,
  onHide = () => {},
}: {
  congratsRef: React.MutableRefObject<CongratsOverlayRef>;
  onHide?: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity: 0 (hidden)
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Scale: 0.5 (small)
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  useImperativeHandle(congratsRef, () => {
    return {
      start: (name) => {
        setIsVisible(true);
        setName(name);
        start();
      },
    };
  });

  // Hide animation
  const hideAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.5,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
      onHide?.();
    }); // Call onHide when animation completes
  };

  const start = () =>
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(hideAnimation);

  if (!isVisible) {
    return null;
  }
  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim, // Bind opacity to animation
          transform: [{ scale: scaleAnim }], // Bind scale to animation
        },
      ]}
    >
      <Text style={styles.text}>Congrats {name}!</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: "40%", // Center vertically (adjust as needed)
    left: "10%", // Center horizontally with some padding
    right: "10%",
    backgroundColor: "rgba(0, 128, 0, 0.9)", // Green with transparency
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
