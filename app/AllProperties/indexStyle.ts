import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: "white",
  },
  headContainer: {
    width: 335,
    height: 70,
    marginTop: 15,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 15,
    alignItems: "center",
  },
  container: {
    marginTop: -5,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default styles;
