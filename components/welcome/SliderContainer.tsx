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
import i18n from "@/i18n/i18n";
import { LinearGradient } from "expo-linear-gradient";
import Bathroom from "../../assets/icons/bathroom.svg";
import Bedroom from "../../assets/icons/Bedroom.svg";
import Parking from "../../assets/icons/parking.svg";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { styles } from "./SliderContainerStyle";

const Welcome = () => {
  const { width: screenWidth } = Dimensions.get("window");
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [fontsLoaded] = useFonts({
    Inter_400Regular: require("../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    Inter_600SemiBold: require("../../assets/fonts/Inter/Inter_24pt-SemiBold.ttf"),
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
            <Screen width={259} height={270} style={styles.House} />
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
              <Bathroom width={28} height={28} style={styles.Bathroom} />
              <Text style={styles.iconLabel}>3 bathrooms</Text>
            </View>
            <View style={styles.iconItem2}>
              <Bedroom width={28} height={28} style={styles.Bedroom} />
              <Text style={styles.iconLabel}>3 Bedrooms</Text>
            </View>
            <View style={styles.iconItem3}>
              <Parking width={28} height={28} style={styles.Parking} />
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

export default Welcome;
