import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from "react-native";
import { useGetOpportunityQuery } from "@/src/api/opportunitiesApiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import i18n from "@/src/i18n/i18n";
import { formatPrice } from "@/utils/formatPrice";
import Frame52 from "@/assets/icons/Frame52.svg";
import Frame54 from "@/assets/icons/Frame54.svg";
import Furniture from "@/assets/icons/Furniture.svg";
import Chandelier from "@/assets/icons/Chandelier.svg";
import Fridge from "@/assets/icons/Fridge.svg";
import Sophie from "@/assets/icons/sophie.svg";
import WhatApp from "@/assets/icons/whatsapp.svg";
import styles from "./CardDetails";
const Header = ({ media, onBackPress, onLikePress, isLiked }) => (
  <View style={styles.header}>
    <FlatList
      data={media.slice(0, 3)}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image source={{ uri: item.url }} style={styles.propertyImage} />
      )}
      keyExtractor={(item) => item.url}
    />
    <View style={styles.icons}>
      <TouchableOpacity style={styles.icon1} onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon2} onPress={onLikePress}>
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={24}
          color={isLiked ? "#8BC240" : "black"}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const PriceSection = ({
  share_price,
  currency,
  available_shares,
  number_of_shares,
}) => (
  <View style={styles.priceSection}>
    <Text style={styles.price}>
      {formatPrice(share_price)} {currency}
    </Text>
    <Text style={styles.shares}>
      {available_shares}/{number_of_shares} {i18n.t("ownerShip")}
    </Text>
  </View>
);

const FeaturesSection = ({ number_of_bedrooms, number_of_bathrooms }) => (
  <View style={styles.features}>
    <View style={styles.featureItem}>
      <Furniture />
      <Text style={styles.featureText}>2,553sqft</Text>
    </View>
    <View style={styles.featureItem}>
      <Frame52 />
      <Text style={styles.featureText}>
        {i18n.t("bedrooms", { count: number_of_bedrooms })}
      </Text>
    </View>
    <View style={styles.featureItem}>
      <Frame54 />
      <Text style={styles.featureText}>
        {i18n.t("bathroom", { count: number_of_bathrooms })}
      </Text>
    </View>
  </View>
);

const BadgeAndDescription = ({
  opportunity_type,
  description_en,
  description_ar,
}) => (
  <View>
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{opportunity_type}</Text>
    </View>
    <Text style={styles.descriptionTitle}>{i18n.t("description")}</Text>
    <Text style={styles.description}>
      {i18n.locale === "en" ? description_en : description_ar}
    </Text>
  </View>
);

const AmenitiesSection = ({ data }) => (
  <View style={styles.amenitiesFeatures}>
    <View style={styles.amenitiesItem}>
      <Frame52 />
      <Text style={styles.amenitiesFeatureNum}>{data?.number_of_bedrooms}</Text>
      <Text style={styles.amenitiesFeatureText}>{i18n.t("bedroomsam")}</Text>
    </View>
    <View style={styles.amenitiesItem}>
      <Frame54 />
      <Text style={styles.amenitiesFeatureNum}>
        {data?.number_of_bathrooms}
      </Text>
      <Text style={styles.amenitiesFeatureText}>{i18n.t("bathroomam")}</Text>
    </View>
    <View style={styles.amenitiesItem}>
      <Chandelier style={styles.icon} />
      <Text style={styles.amenitiesFeatureNum}>2</Text>
      <Text style={styles.amenitiesFeatureText}>{i18n.t("SittingArea")}</Text>
    </View>
    <View style={styles.amenitiesItem}>
      <Fridge style={styles.icon} />
      <Text style={styles.amenitiesFeatureNum}>
        {data?.number_of_bathrooms}
      </Text>
      <Text style={styles.amenitiesFeatureText}>{i18n.t("Kitchen")}</Text>
    </View>
  </View>
);
const ContactSection = () => (
  <View style={styles.contactCard}>
    <Text style={styles.contactTitle}>{i18n.t("getInTouchWithSophie")}</Text>
    <WhatApp style={styles.whatsappIcon} />
    <Text style={styles.contactDescription}>
      {i18n.t("getInTouchDescription")}
    </Text>
    <View style={styles.personContainer}>
      <Sophie style={styles.person} />
      <Text style={styles.whatsappButtonText}>Sophie Moore</Text>
    </View>
  </View>
);
const PriceDetailsSection = ({
  share_price,
  currency,
  available_shares,
  number_of_shares,
  opportunityType,
}) => (
  <View style={styles.priceCard}>
    <View style={styles.pricecontent}>
      <Text style={styles.priceTitle}>
        {formatPrice(share_price)} {currency}
      </Text>
      <Text style={styles.priceSubtitle}>
        {available_shares}/{number_of_shares} {i18n.t("ownerShip")}
      </Text>
    </View>
    <Text style={styles.priceDetails}>{i18n.t("buyUpTo50Percent")}</Text>
    <View style={styles.whiteBar}>
      <View style={styles.whiteCircle}></View>
      <View style={styles.whiteCircle}></View>
      <View style={styles.whiteCircle}></View>
    </View>
    <Text style={styles.Cashtitle}>{i18n.t("cashPrice")}</Text>
    <Text style={styles.priceTitle}>
      {formatPrice(share_price)} {currency}
    </Text>
    {opportunityType === "project" && (
      <>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>
            {i18n.t("expected1YearAppreciation")}
          </Text>
          <Text style={styles.priceValue}>9.2%</Text>
        </View>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>
            {i18n.t("expected5YearAppreciation")}
          </Text>
          <Text style={styles.priceValue}>47%</Text>
        </View>
      </>
    )}
  </View>
);
const ROIPerYearSection = ({ data }) => (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>{i18n.t("ROI-Rental Rev")}</Text>
    <View>
      <Text style={styles.sectionTitle}>
        {i18n.t("From")} {data?.data?.roi_revenue_from}% {i18n.t("To")}{" "}
        {data?.data?.roi_revenue_to}%{" "}
      </Text>
    </View>
    <Text style={styles.bar}></Text>
    <View>
      <Text style={styles.sectionTitle}>
        {" "}
        {i18n.t("ROI-Expected Appreciation")}
      </Text>
      <Text style={styles.sectionTitle}>
        {i18n.t("From")} {data?.data?.roi_appreciation_from}% {i18n.t("To")}{" "}
        {data?.data?.roi_appreciation_to}%{" "}
      </Text>
    </View>
  </View>
);
const NightsPerYearSection = () => (
  <View style={styles.card1}>
    <Text style={styles.sectionTitle}>{i18n.t("nightsPerYear")}</Text>
    <Text style={styles.largeText}>41</Text>
  </View>
);
const CardDetails = () => {
  const [opportunityType, setOpportunityType] = useState("property");
  const handleSwitch = () => {
    setOpportunityType(opportunityType === "project" ? "property" : "project");
  };
  const [isLiked, setisLiked] = useState(false);
  const router = useRouter();
  const { id, type } = useLocalSearchParams();
  const { data, isLoading, isError } = useGetOpportunityQuery(
    { id, type },
    {
      skip: !id || !type,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    const backAction = () => {
      router.push("/");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [router]);

  const toggleLike = () => setisLiked((prev) => !prev);

  if (!id || !type) return <Text>{i18n.t("noOpportunityIdOrType")}</Text>;
  if (isLoading) return <Text>{i18n.t("loading")}</Text>;
  if (isError) return <Text>{i18n.t("errorOccurred")}</Text>;
  if (!data) return <Text>{i18n.t("noDataAvailable")}</Text>;

  const renderContent = () => {
    const commonProps = {
      media: data?.data?.media,
      onBackPress: () => router.push("/"),
      onLikePress: toggleLike,
      isLiked,
      data: data?.data,
    };

    return (
      <ScrollView style={styles.container}>
        <Header {...commonProps} />
        <View style={styles.detailsCard}>
          <PriceSection
            share_price={data?.data?.share_price}
            currency={data?.data?.currency}
            available_shares={data?.data?.available_shares}
            number_of_shares={data?.data?.number_of_shares}
          />
          <Text style={styles.title}>
            {i18n.locale === "ar" ? data?.data?.title_ar : data?.data?.title_en}
          </Text>
          <View style={styles.locationContainer}>
            <AntDesign
              name="enviromento"
              size={17}
              color="black"
              style={styles.locationicon}
            />
            <Text style={styles.location}>
              {i18n.locale === "ar"
                ? data?.data?.location_ar
                : data?.data?.location_en}
            </Text>
          </View>
          <FeaturesSection
            number_of_bedrooms={data?.data?.number_of_bedrooms}
            number_of_bathrooms={data?.data?.number_of_bathrooms}
          />
          <BadgeAndDescription
            opportunity_type={data?.data?.opportunity_type}
            description_en={data?.data?.description_en}
            description_ar={data?.data?.description_ar}
          />
          <AmenitiesSection data={data?.data} />
        </View>
        <ContactSection />
        <PriceDetailsSection
          share_price={data?.data?.share_price}
          currency={data?.data?.currency}
          available_shares={data?.data?.available_shares}
          number_of_shares={data?.data?.number_of_shares}
          opportunityType={opportunityType}
        />
        {opportunityType === "project" ? (
          <NightsPerYearSection />
        ) : (
          <ROIPerYearSection data={data} />
        )}
      </ScrollView>
    );
  };
  return <View>{renderContent()}</View>;
};

export default CardDetails;
