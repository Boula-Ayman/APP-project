import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Bed from "@/assets/icons/bed.svg";
import Bath from "@/assets/icons/bath.svg";
import Area from "@/assets/icons/area.svg";
import HeartOutlineIcon from "@/assets/icons/Heart.svg";
import HeartFilledIcon from "@/assets/icons/filledHeart.svg";
import i18n from "@/i18n/i18n";
import Tag from "@/commonComponent/Tag/Tag";
import { noImagePlaceHolder } from "@/utils/noImagePlaceHolder";

export interface Opportunity {
  id: string;
  media: Array<{ url: string }>;
  country?: "Egypt" | "UAE";
  opportunity_type?: string;
  share_price?: number;
  currency?: string;
  available_shares?: number;
  number_of_shares?: number;
  title_ar?: string;
  title_en?: string;
  location_ar?: string;
  location_en?: string;
  number_of_bedrooms?: number;
  number_of_bathrooms?: number;
  area?: number;
  status?: string;
}

export interface CardProps {
  item: Opportunity;
  isLiked: boolean;
  onLoveIconPress: () => void;
  showPriceSection?: boolean;
  showFeatures?: boolean;
  onPress?: () => void;
  showStatus?: boolean;
}

const PropertyCard: React.FC<CardProps> = ({
  item,
  isLiked,
  onLoveIconPress,
  showPriceSection = true,
  showFeatures = true,
  onPress,
  showStatus = false,
}) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const renderPriceSection = () => {
    if (!showPriceSection) return null;

    return (
      <View style={styles.priceSection}>
        <Text style={styles.cardPrice}>
          {formatPrice(item.share_price || 0)} {item.currency}
        </Text>
        <Text style={styles.ownerShip}>
          {item.available_shares}/{item.number_of_shares} Ownership
        </Text>
        <TouchableOpacity style={styles.HeartOverlay} onPress={onLoveIconPress}>
          {isLiked ? (
            <HeartFilledIcon
              width={21}
              height={21}
              style={styles.icon}
              fill={"white"}
            />
          ) : (
            <HeartOutlineIcon
              width={21}
              height={21}
              style={styles.icon}
              fill={"white"}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderPropertyInfo = () => {
    return (
      <>
        <Text style={styles.cardTitle}>{item.title_en}</Text>
        <View style={styles.locationSection}>
          <AntDesign
            name="enviromento"
            size={17}
            color="black"
            style={styles.location}
          />
          <Text style={styles.cardLocation}>{item.location_en}</Text>
        </View>
      </>
    );
  };

  const renderFeatures = () => {
    if (!showFeatures) return null;

    return (
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <View style={styles.iconContainer}>
            <Area />
          </View>
          <Text style={styles.featureText}>
            {i18n.t("area", { count: item.area })}
          </Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.iconContainer}>
            <Bed />
          </View>
          <Text style={styles.featureText}>
            {i18n.t("bedrooms", { count: item.number_of_bedrooms })}
          </Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.iconContainer}>
            <Bath />
          </View>
          <Text style={styles.featureText}>
            {i18n.t("bathroom", { count: item.number_of_bathrooms })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: item?.media[0]?.url ? item.media[0].url : noImagePlaceHolder,
          }}
          style={styles.cardImage}
        />
        <View style={styles.overlay}>
          <Tag
            text={showStatus ? item.status || "" : item.opportunity_type || ""}
            type={showStatus ? "status" : "property_type"}
            status={
              showStatus
                ? (item.status as "confirmed" | "pending" | "cancelled")
                : undefined
            }
          />
        </View>
      </View>

      <View style={styles.details}>
        {renderPriceSection()}
        {renderPropertyInfo()}
        {renderFeatures()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "auto",
    height: "auto",
    borderRadius: 33,
    backgroundColor: "#fff",
    borderWidth: 0.85,
    borderColor: "#EBEBEB",
    overflow: "hidden",
    marginBottom: 16,
  },
  imageWrapper: {
    position: "relative",
    padding: 15,
    paddingBottom: 0,
  },
  cardImage: {
    width: "100%",
    height: 210,
    marginBottom: 10,
    borderRadius: 22,
  },
  overlay: {
    position: "absolute",
    top: 25,
    left: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    padding: 16,
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8BC240",
  },
  ownerShip: {
    fontSize: 12,
    color: "#808080",
  },
  HeartOverlay: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2B2B2B",
    marginBottom: 8,
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  location: {
    marginRight: 5,
    color: "#808080",
  },
  cardLocation: {
    fontSize: 12,
    color: "#666",
  },
  features: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 4,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    flex: 1,
  },
  featureText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#818181",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    // width: 20,
    // height: 20,
    // resizeMode: 'contain',
  },
  statusIcon: {
    marginRight: 4,
  },
});

export default PropertyCard;
