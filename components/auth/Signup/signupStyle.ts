import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  scrollContent: {
    padding: 20,
    flexGrow: 1,
    gap: 15,
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  backButton: {
    width: 48,
    height: 48,
    top: 30,
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
    top: 40,
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
    marginTop: 12,
  },
  Name: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "column",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 15,
  },
  errorContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  firstName: {
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
    width: "60%",
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
    marginTop: -10,
  },
});

export default styles;
