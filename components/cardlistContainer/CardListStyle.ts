import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(139, 194, 64, 0)",
    paddingTop: 6,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  card: {
    width: 284,
    height: "auto",
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 0.85,
    borderColor: "#EBEBEB",
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
    padding: 15,
    paddingBottom: 0,
  },
  cardImage: {
    flexGrow: 1,
    width: "100%",
    height: 210,
    marginBottom: 10,
    borderRadius: 22,
  },
  overlay: {
    position: "absolute",
    top: 25,

    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  overlayIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  textContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  overlayText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },
  details: {
    padding: 16,
    alignContent: "center",
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8BC240",
  },

  ownerShip: {
    fontSize: 12,
    color: "#808080",
  },
  HeartOverlay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  Heart: {
    width: 24,
    height: 24,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2B2B2B",
    marginBottom: 8,
    textAlign: "left",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 3,
  },
  location: {
    width: 15,
    height: 17,

    color: "#808080",
  },
  cardLocation: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#818181",
  },
  soldOutLabel: {
    position: "relative",

    fontSize: 14,
    color: "white",
    fontWeight: "medium",
    fontFamily: "InterMedium",
  },
});

export default styles;
