import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Phone from "../../assets/Images/iPhone.svg";
import Screen from "../../assets/Images/Screentest.svg";
import i18n from "@/src/i18n/i18n";
import { LinearGradient } from "expo-linear-gradient";
import Bathroom from "../../assets/icons/bathroom.svg";
import Bedroom from "../../assets/icons/Bedroom.svg";
import Parking from "../../assets/icons/parking.svg";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import * as Font from "expo-font";

const Welcome = () => {
  const { width: screenWidth } = Dimensions.get("window");
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Inter_400Regular: require("../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
        Inter_600SemiBold: require("../../assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
      });
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  const slides = [
    {
      id: "1",
      image: (
        <View style={styles.phoneContainer}>
          <Phone width={300} height={350} />
          <View style={styles.screenContainer}>
            <Screen width={259} height={270} />
          </View>
        </View>
      ),
      header: i18n.t("header1"),
      desc: i18n.t("descr1"),
    },
    {
      id: "2",
      image: (
        <View style={styles.phoneContainer}>
          <Phone width={300} height={350} />
          <View style={styles.screenContainer}>
            <Screen width={259} height={270} />
          </View>
        </View>
      ),
      header: i18n.t("header2"),
      desc: i18n.t("descr2"),
    },
    {
      id: "3",
      image: (
        <View style={styles.phoneContainer}>
          <Phone width={300} height={350} />
          <View style={styles.screenContainer}>
            <Screen width={259} height={270} />
          </View>
        </View>
      ),
      header: i18n.t("header3"),
      desc: i18n.t("descr3"),
    },
  ];

  const renderSlide = ({ item }: { item: any }) => {
    return (
      <View style={[styles.slideContainer, { width: screenWidth }]}>
        {item.image}

        {item.id === "2" && (
          <View style={styles.iconsContainer}>
            <View style={styles.iconItem1}>
              <Bathroom width={28} height={28} />
              <Text style={styles.iconLabel}>3 bathrooms</Text>
            </View>
            <View style={styles.iconItem2}>
              <Bedroom width={28} height={28} />
              <Text style={styles.iconLabel}>3 Bedrooms</Text>
            </View>
            <View style={styles.iconItem3}>
              <Parking width={28} height={28} />
              <Text style={styles.iconLabel}>6 parking zones</Text>
            </View>
          </View>
        )}

        <View style={styles.gradientOverlay}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.0001)", "#FFFFFF"]}
            start={{ x: 0, y: 0 }} // Start from the top
            end={{ x: 0, y: 1 }} // End at the bottom
            style={styles.gradient}
          />
        </View>
        <Text style={styles.header}>{item.header}</Text>
        <Text style={styles.description}>{item.desc}</Text>
      </View>
    );
  };

  const GradientDot = ({ index }: { index: number }) => {
    return (
      <TouchableOpacity onPress={() => handleDotPress(index)}>
        <LinearGradient
          colors={["#8BC240", "#8BC240"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientDot}
        />
      </TouchableOpacity>
    );
  };

  const InactiveDot = ({ index }: { index: number }) => {
    return (
      <TouchableOpacity onPress={() => handleDotPress(index)}>
        <View style={styles.inactiveDot} />
      </TouchableOpacity>
    );
  };

  const handleDotPress = (index: number) => {
    setActiveSlide(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleScroll = (event: any) => {
    const slideWidth = screenWidth;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideWidth);
    setActiveSlide(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.paginationContainer}>
        {slides.map((_, index) =>
          index === activeSlide ? (
            <GradientDot key={index} index={index} />
          ) : (
            <InactiveDot key={index} index={index} />
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    top: -50,
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  phoneContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  screenContainer: {
    position: "absolute",
    top: 50,
    left: 21,
    borderRadius: 50,
  },
  gradientOverlay: {
    position: "absolute",
    width: 375,
    height: 145,
    top: 315,
  },
  gradient: {
    flex: 1,
  },
  header: {
    marginBottom: 30,
    top: 20,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 25.6,
    textDecorationLine: "none",
    color: "#0E0C20",
    width: 315,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 25,
    textAlign: "center",
    color: "#242B36",
    top: 3,
  },
  gradientDot: {
    width: 20,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    right: 10,
    top: -85,
  },
  inactiveDot: {
    width: 20,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
    top: -85,
    right: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    top: 150,
  },
  iconItem1: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    width: 141,
    height: 52,
    backgroundColor: "white",
    borderRadius: 10,
    gap: 10,
    left: 37,
    top: 7,
  },
  iconItem2: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    width: 141,
    height: 52,
    backgroundColor: "white",
    borderRadius: 10,
    gap: 10,
    left: 110,
    top: 80,
  },
  iconItem3: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    width: 145,
    height: 52,
    backgroundColor: "white",
    borderRadius: 10,
    gap: 5,
    top: 255,
    right: 145,
    zIndex: 100,
  },
  iconLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    fontWeight: "400",
    color: "#242B36",
    alignItems: "center",
    right: 1,
    zIndex: 100,
  },
});

export default Welcome;
