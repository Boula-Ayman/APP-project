import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  scrollContent: {
    padding: 20,
    flexGrow: 1,
    gap: 25,
    top: -39,
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  backButton: {
    width: 48,
    height: 48,
    top: 71,
    right: 58,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    top: 71,
    left: 15,
    color: "gray",
  },
  one: {
    color: "#8BC240",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    top: 60,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  firstName: {
    top: 55,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  lastName: {
    top: 10,
    left: 170,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  emailContainer: {
    top: -13,
  },
  email: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    top: -15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    height: 56,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  password: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    top: -53,
    right: 9,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    right: 74,
    height: 56,
  },
  termsText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginVertical: 20,
    top: -30,
  },
  linkText: {
    color: "#8BC240",
  },
  signUpButton: {
    // backgroundColor: "#8BC240",
    // padding: 15,
    // borderRadius: 8,
    // alignItems: "center",
    top: -35,
    right: 19,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default styles;
