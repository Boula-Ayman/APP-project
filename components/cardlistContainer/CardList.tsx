import React, { useRef } from "react";
import { Animated, View, Pressable, Text } from "react-native";
import styles from "./CardListStyle";
import Card from "../../app/Home/CardListoportunity/Card";
import { Opportunity } from "@/src/interfaces/opportunity.interface";
import { Link } from "expo-router";
import { useGetWishListQuery } from "@/src/wishList/wishListApiSlice";

import i18n from "@/i18n/i18n";

const CARD_WIDTH = 284;
const SPACING = 25;

interface CardListProps {
  opportunities: Opportunity[];
}

const CardList: React.FC<CardListProps> = ({ opportunities }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { data: wishList } = useGetWishListQuery({});

  return (
    <View style={styles.container}>
      {opportunities.length ? (
        <Animated.FlatList
          data={opportunities}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          style={{
            direction: "ltr",
          }}
          contentContainerStyle={[
            styles.flatListContent,
            { direction: i18n.language === "ar" ? "rtl" : "ltr" },
          ]}
          inverted={i18n.language === "ar" ? true : false}
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
                }&likedItems=${JSON.stringify(wishList)}`}
                asChild
              >
                <Pressable>
                  <Animated.View style={[{ transform: [{ scale }] }]}>
                    <Card
                      item={item}
                      isLiked={wishList?.data?.some(
                        (likedItem: Opportunity) => likedItem.id === item.id
                      )}
                    />
                  </Animated.View>
                </Pressable>
              </Link>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            marginTop: "25%",
            marginInline: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>No opportunities found</Text>
        </View>
      )}
    </View>
  );
};

export default CardList;
