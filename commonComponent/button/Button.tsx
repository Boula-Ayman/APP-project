import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8BC240",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: "center",
    width: 335,
    height: 56,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 25.6,
    textAlign: "left",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    lineHeight: 25.6,
  },
});

export default Button;
