import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../../../components/cardlistContainer/CardListStyle";
import UaeFlag from "../../../assets/icons/UAE.svg";
import EgyptFlag from "../../../assets/icons/egypt.svg";
import LoveIcon from "../../../assets/icons/Heart.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import Frame52 from "../../../assets/icons/Frame52.svg";
import Frame54 from "../../../assets/icons/Frame54.svg";
import { formatPrice } from "@/utils/formatPrice";
import i18n from "../../../i18n/i18n";
import { Opportunity } from "@/src/interfaces/opportunity.interface";
import FilledHeart from "@/assets/icons/filledHeart.svg";
import { useGetWishListQuery, usePostWishListMutation } from "@/src/wishList/wishListApiSlice";
import { useRemoveWishListMutation } from "@/src/wishList/wishListApiSlice";

export interface CardProps {
  item: Opportunity;
  isLiked: boolean;
}

const Card: React.FC<CardProps> = ({ item, isLiked }) => {
    const {data: wishList, refetch} = useGetWishListQuery({});
    
    const [postWishList] = usePostWishListMutation();
    const [removeWishList] = useRemoveWishListMutation();

    const handleLoveIconPress = async (id: number, item: Opportunity) => {
        const isLiked = wishList?.data?.some((likedItem: Opportunity) => likedItem.id === id);
        try {
            if (isLiked) {
                await removeWishList({ id }).unwrap();
            } else {
                await postWishList({ id }).unwrap();
            }
        } catch (error) {
            console.error("Failed to update wishlist:", error);
            if (error instanceof Error) {
                console.error("Error details:", error.message);
            }
        } finally {
            refetch();
        }
    }

    return (
        <View style={styles.card}>
        <View style={styles.imageWrapper}>
            <Image source={{ uri: item?.media[0]?.url }} style={styles.cardImage} />
            <View style={styles.overlay}>
                {item.country === "Egypt" ? <EgyptFlag style={styles.overlayIcon} /> : <UaeFlag style={styles.overlayIcon} />}
            <View style={styles.textContainer}>
                <Text style={styles.overlayText}>{item.opportunity_type}</Text>
            </View>
            </View>
        </View>
        <View style={styles.details}>
            <View style={styles.priceSection}>
            <Text style={styles.cardPrice}>
                {formatPrice(item.share_price)} {item.currency}
            </Text>
            <Text style={styles.ownerShip}>
                {item.available_shares}/{item.number_of_shares}{" "}
                {i18n.t("ownerShip")}
            </Text>
            <TouchableOpacity
                style={styles.HeartOverlay}
                onPress={() => handleLoveIconPress(item.id, item)}
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
            <Text style={styles.cardLocation}>
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
