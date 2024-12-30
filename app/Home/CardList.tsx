// CardList.tsx
import React, { useRef, useState } from "react";
import { Animated, FlatList, View, Dimensions } from "react-native";
import styles from "./CardListStyle";
import Card from "./CardListoportunity/Card";
import { useGetOpportunitiesQuery } from "@/src/api/opportunitiesApiSlice";
import i18n from "../../src/i18n/i18n";
import { Opportunity } from "@/src/interfaces/opportunity.interface"; // Import the Opportunity interface

const { width } = Dimensions.get("window");
const CARD_WIDTH = 284;
const SPACING = 25;

const CardList: React.FC<{ opportunities: any[] }> = ({ opportunities }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { data } = useGetOpportunitiesQuery({
    refetchOnMountOrArgChange: true,
  });
  console.log(data);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const handleLoveIconPress = (id: number) => {
    setLikedItems((prev) => {
      const newLikedItems = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      return newLikedItems;
    });
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={opportunities}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View style={[{ transform: [{ scale }] }]}>
              <Card
                item={item}
                isLiked={likedItems.includes(item.id)}
                onLoveIconPress={() => handleLoveIconPress(item.id)}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default CardList;
