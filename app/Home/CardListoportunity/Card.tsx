import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../../../components/cardlistContainer/CardListStyle";
import UaeFlag from "../../../assets/icons/UAE.svg";
import EgyptFlag from "../../../assets/icons/egypt.svg";
import LoveIcon from "../../../assets/icons/Heart.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import Frame52 from "../../../assets/icons/Frame52.svg";
import Frame54 from "../../../assets/icons/Frame54.svg";
import i18n from "../../../i18n/i18n";
import { Opportunity } from "@/src/interfaces/opportunity.interface";
import FilledHeart from "@/assets/icons/filledHeart.svg";
import {
  useGetWishListQuery,
  usePostWishListMutation,
  useRemoveWishListMutation,
} from "@/src/wishList/wishListApiSlice";
import { noImagePlaceHolder } from "@/utils/noImagePlaceHolder";
import { t } from "i18next";

export interface CardProps {
  item: Opportunity;
  isLiked: boolean;
}

const Card: React.FC<CardProps> = ({ item, isLiked }) => {
  const { data: wishList, refetch } = useGetWishListQuery({});
  const [postWishList] = usePostWishListMutation();
  const [removeWishList] = useRemoveWishListMutation();

  const handleLoveIconPress = async (id: number) => {
    const isLiked = wishList?.data?.some(
      (likedItem: Opportunity) => likedItem.id === id
    );
    try {
      if (isLiked) {
        await removeWishList({ id }).unwrap();
      } else {
        await postWishList({ id }).unwrap();
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      refetch();
    }
  };

  return (
    <View style={styles.card}>
      {item.status === "sold out" && (
        <View
          style={[
            {
              position: "absolute",
              top: 25,
              zIndex: 1,
              height: 30,
              width: 80,
              borderRadius: 10,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            },
            i18n.language === "en" ? { right: 20 } : { left: 20 },
          ]}
        >
          <Text style={styles.soldOutLabel}>{i18n.t("soldOut")}</Text>
        </View>
      )}

      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: item?.media[0]?.url ? item?.media[0]?.url : noImagePlaceHolder,
          }}
          style={styles.cardImage}
        />
        <View
          style={[
            styles.overlay,
            i18n.language === "en" ? { left: 5 } : { right: 5 },
          ]}
        >
          {item.country === "Egypt" ? (
            <EgyptFlag style={styles.overlayIcon} />
          ) : (
            <UaeFlag style={styles.overlayIcon} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.overlayText}>{t(item.opportunity_type)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.priceSection}>
          <Text style={styles.cardPrice}>
            {i18n.language === "en"
              ? item.share_price.toLocaleString()
              : item.share_price.toLocaleString("ar-EG")}{" "}
            {`${t(item.currency)}`}
          </Text>
          <Text style={styles.ownerShip}>
            {i18n.language === "en"
              ? `${item.available_shares ?? 0}/${item.number_of_shares}`
              : `${
                  item.available_shares?.toLocaleString("ar-EG") ??
                  (0).toLocaleString("ar-EG")
                }/${item.number_of_shares.toLocaleString("ar-EG")}`}{" "}
            {i18n.t("ownerShip")}
          </Text>
          <TouchableOpacity
            style={styles.HeartOverlay}
            onPress={() => handleLoveIconPress(item.id)}
          >
            {!isLiked ? (
              <LoveIcon style={styles.Heart} fill={"white"} />
            ) : (
              <FilledHeart />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.cardTitle}>
          {i18n.language === "ar" ? item.title_ar : item.title_en}
        </Text>

        <View style={styles.locationSection}>
          <AntDesign
            name="enviromento"
            size={17}
            color="black"
            style={styles.location}
          />
          <Text
            style={styles.cardLocation}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {i18n.language === "ar" ? item.location_ar : item.location_en}
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Frame52 />
            <Text style={styles.featureText}>
              {i18n.t("bedrooms", { count: item.number_of_bedrooms })}
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Frame54 />
            <Text style={styles.featureText}>
              {i18n.t("bathroom", { count: item.number_of_bathrooms })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
