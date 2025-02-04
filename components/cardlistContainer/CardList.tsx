import React, { useRef } from "react";
import { Animated, View, Dimensions, Pressable, Text } from "react-native";
import styles from "./CardListStyle";
import Card from "../../app/Home/CardListoportunity/Card";
import { Opportunity } from "@/src/interfaces/opportunity.interface";
import { Link } from "expo-router";
import {
  usePostWishListMutation,
  useRemoveWishListMutation,
} from "@/src/wishList/AdWishList/wishListApiSliceAdd";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../src/wishList/wishlistSlice";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 284;
const SPACING = 25;

interface CardListProps {
  opportunities: Opportunity[];
}

const CardList: React.FC<CardListProps> = ({ opportunities }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const likedItems = useSelector((state: any) => state.wishlist.likedItems);
  const dispatch = useDispatch();
  const [postWishList] = usePostWishListMutation();
  const [removeWishList] = useRemoveWishListMutation();
  
  const handleLoveIconPress = async (id: number, item: Opportunity) => {
      const isLiked = likedItems.map((i: any) => i.id).includes(item.id);

    try {
      if (isLiked) {
        await removeWishList({ id }).unwrap();
        dispatch(removeFromWishlist(id));
      } else {
        dispatch(addToWishlist(id));
        await postWishList({ id }).unwrap();
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
        {opportunities.length ? 
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
                href={`/carddetails/${item.id}?type=${
                    item.opportunity_type
                }&likedItems=${JSON.stringify(likedItems)}`}
                asChild
                >
                <Pressable>
                    <Animated.View style={[{ transform: [{ scale }] }]}>
                    <Card
                        item={item}
                        isLiked={likedItems.map((i: Opportunity) => i.id).includes(item.id)}
                        onLoveIconPress={() => handleLoveIconPress(item.id, item)}
                    />
                    </Animated.View>
                </Pressable>
                </Link>
            );
            }}
      /> : <View style={{
        flex: 1,
        marginTop: '25%',
        marginInline: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>No opportunities found</Text>
      </View>}
    </View>
  );
};

export default CardList;
