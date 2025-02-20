import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    top: 50,
  },
  barIcon: {
    flexDirection: "row",
    width: 51,
    height: 51,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#92929233",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  barIcon2: {
    alignItems: "center",
    width: 24,
    height: 24,
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  topSection: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
  },
  middleSection: {
    height: "auto",
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    padding: 10,
    paddingBottom: 50,
    marginTop: 120,
  },
  contentSection: {
    marginTop: 20,
    alignContent: "center",
  },
  cirlce: {
    justifyContent: "center",
    alignItems: "center",
    width: 12,
    height: 12,
    borderRadius: 25,
    color: "#8BC240",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    fontFamily: "Inter",
    textAlign: "center",
  },
  dropdownContainer: {
    flexDirection: "column",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  dropdownText: {
    fontSize: 14,
    color: "#555",
  },
  selectedButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  filterButtonLarge: {
    marginTop: 24,
    backgroundColor: "#8bc240",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  filterButtonLargeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownMenu: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "70%",
    marginTop: 30,
  },
  dropdownTitle: { 
    display: "flex", 
    alignItems: "center",
    gap: 5,
    flexDirection: "row"
  },
});

export default styles;
