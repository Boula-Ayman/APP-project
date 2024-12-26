import React, { useRef } from "react";
import {
  Animated,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import styles from "./CardListStyle";
import Flag from "../../assets/icons/UAE.svg";
import LoveIcon from "../../assets/icons/Heart.svg";
import Frame52 from "../../assets/icons/Frame52.svg";
import Frame54 from "../../assets/icons/Frame54.svg";
import Image40 from "../../assets/Images/image40.svg";
import Image42 from "../../assets/Images/image42.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
const { width } = Dimensions.get("window");
const CARD_WIDTH = 284;
const SPACING = 25;

const CardList: React.FC = () => {
  const cardData = [
    {
      id: "1",
      price: "75,000 AED",
      ownerShip: "1/8 ownership",
      title: "Tranquil Haven in the Woods",
      location: "Dubai Marina, Dubai, UAE",
      bedrooms: 2,
      bathrooms: 2,
      type: "Residential",
    },
    {
      id: "2",
      price: "85,000 AED",
      ownerShip: "1/6 ownership",
      title: "Modern Serenity Villa",
      location: "Palm Jumeirah, Dubai, UAE",
      bedrooms: 3,
      bathrooms: 3,
      type: "Residential",
      image: Image42,
    },
    {
      id: "3",
      price: "95,000 AED",
      ownerShip: "Full ownership",
      title: "Luxurious Penthouse Suite",
      location: "Downtown Dubai, UAE",
      bedrooms: 4,
      bathrooms: 4,
      type: "Residential",
    },
  ];

  const scrollX = useRef(new Animated.Value(0)).current; // Track scroll position

  const handleLoveIconPress = (id: string) => {
    console.log(`Love icon pressed for item with id: ${id}`);
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={cardData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING} // Snap cards perfectly
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          // Calculate scaling based on scroll position
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9], // Focused card is full size, others shrink
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ scale }],
                },
              ]}
            >
              <View style={styles.imageWrapper}>
                <Image40 style={styles.cardImage} />
                <View style={styles.overlay}>
                  <Flag style={styles.overlayIcon} />
                  <View style={styles.textContainer}>
                    <Text style={styles.overlayText}>{item.type}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.details}>
                <View style={styles.priceSection}>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                  <Text style={styles.ownerShip}>{item.ownerShip}</Text>
                  <TouchableOpacity
                    style={styles.HeartOverlay}
                    onPress={() => handleLoveIconPress(item.id)}
                  >
                    <LoveIcon style={styles.Heart} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.locationSection}>
                  <AntDesign
                    name="enviromento"
                    size={17}
                    color="black"
                    style={styles.location}
                  />
                  <Text style={styles.cardLocation}>{item.location}</Text>
                </View>
                <View style={styles.features}>
                  <View style={styles.featureItem}>
                    <Frame52 />
                    <Text style={styles.featureText}>
                      {item.bedrooms} Bedroom
                    </Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Frame54 />
                    <Text style={styles.featureText}>
                      {item.bathrooms} Bathroom
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default CardList;
