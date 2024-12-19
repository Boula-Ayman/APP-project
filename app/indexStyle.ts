import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerFocused: {
    width: 58,
    height: 58,
    padding: 15,
    gap: 10,
    borderRadius: 36.68,
    backgroundColor: "#8BC240",
    backdropFilter: "blur(13.97px)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  text: {
    color: "#fff",
  },
});

export default styles;
