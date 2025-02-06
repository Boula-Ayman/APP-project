import { useFonts } from "expo-font";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Arrow from "../../assets/icons/Arrow.svg";
import { router } from "expo-router";
import SoundEffect from "../../assets/icons/soundEffect.svg";
import { useState } from "react";
const ProfileSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const [fontsLoaded, fonts] = useFonts({
    Inter_400Regular: require("../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    Inter_600SemiBold: require("../../assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
    Inter_700Bold: require("../../assets/fonts/Inter/Inter_24pt-Bold.ttf"),
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => router.back()}
          >
            <Arrow style={styles.arrow} />
          </TouchableOpacity>
          <Text style={styles.textHeader}> Settings</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.bodyItem}>
          <SoundEffect style={styles.bodyItemIcon} />
          <Text style={styles.bodyItemText}>Sounds Effects</Text>
        </View>
        <View style={styles.bodyItem}>
          <SoundEffect style={styles.bodyItemIcon} />
          <Text style={styles.bodyItemText}>Sounds Effects</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    marginTop: 35,
    width: "65%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    gap: 60,
  },
  textHeader: {
    fontFamily: " Inter_700Bold",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 21.78,
    color: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  arrow: {},
  body: {},
  bodyContainer: {
    // flexDirection: "column",
    // alignItems: "center",
    marginTop: 40,
    gap: 15,
  },

  bodyItem: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  bodyItemIcon: {},

  bodyItemText: {},
});
