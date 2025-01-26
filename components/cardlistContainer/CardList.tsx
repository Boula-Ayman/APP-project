import React, { useRef, useState, useEffect } from "react";
import { Animated, View, Dimensions, Pressable } from "react-native";
import styles from "./CardListStyle";
import Card from "../../app/Home/CardListoportunity/Card";
import i18n from "../../src/i18n/i18n";
import { Opportunity } from "@/src/interfaces/opportunity.interface";
import { Link } from "expo-router";
import {
  usePostWishListMutation,
  useRemoveWishListMutation,
} from "@/src/wishList/AdWishList/wishListApiSliceAdd";

type CardDetailsHref = `/carddetails/${number}?type=${string}`;
const { width } = Dimensions.get("window");
const CARD_WIDTH = 284;
const SPACING = 25;
interface CardListProps {
  opportunities: Opportunity[];
}
const CardList: React.FC<CardListProps> = ({ opportunities }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [postWishList] = usePostWishListMutation();
  const [removeWishList] = useRemoveWishListMutation();

  const handleLoveIconPress = async (id: number) => {
    const isLiked = likedItems.includes(id);
    setLikedItems((prev) => {
      const newLikedItems = isLiked
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      return newLikedItems;
    });

    try {
      if (isLiked) {
        const result = await removeWishList({ id }).unwrap();
        console.log("Removed from wishlist:", result);
      } else {
        const result = await postWishList({ id }).unwrap();
        console.log("Added to wishlist:", result);
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
    }
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
            <Link
              href={`/carddetails/${item.id}?type=${item.opportunity_type}`}
              asChild
            >
              <Pressable>
                <Animated.View style={[{ transform: [{ scale }] }]}>
                  <Card
                    item={item}
                    isLiked={likedItems.includes(item.id)}
                    onLoveIconPress={() => handleLoveIconPress(item.id)}
                  />
                </Animated.View>
              </Pressable>
            </Link>
          );
        }}
      />
    </View>
  );
};

export default CardList;
