import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Linking,
  Alert,
} from "react-native";
import { useGetOpportunityQuery } from "@/src/api/opportunitiesApiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import i18n from "@/i18n/i18n";
import { formatPrice } from "@/utils/formatPrice";
import Frame52 from "@/assets/icons/Frame52.svg";
import Frame54 from "@/assets/icons/Frame54.svg";
import Furniture from "@/assets/icons/Furniture.svg";
import Chandelier from "@/assets/icons/Chandelier.svg";
import Fridge from "@/assets/icons/Fridge.svg";
import Sophie from "@/assets/icons/sophie.svg";
import WhatApp from "@/assets/icons/whatsapp.svg";
import styles from "./CardDetails";
import FilledHeart from "@/assets/icons/filledHeart.svg";
import Slider from "@react-native-community/slider";
import WhiteCircle from "@/assets/icons/whiteCircle.svg";

const Header = ({
  media,
  onBackPress,
  onLikePress,
  isLiked,
  activeSlide,
  onScroll,
}) => (
  <View style={styles.header}>
    <FlatList
      data={media.slice(0, 3)}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{
        flex: 1,
      }}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item.url }}
          style={[
            styles.propertyImage,
            { width: Dimensions.get("window").width },
          ]}
        />
      )}
      keyExtractor={(item) => item.url}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
    <View style={styles.icons}>
      <TouchableOpacity style={styles.icon1} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={16} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon2} onPress={onLikePress}>
        {isLiked ? (
          <FilledHeart />
        ) : (
          <Ionicons name={"heart-outline"} size={30} color={"black"} />
        )}
      </TouchableOpacity>
    </View>

    {/*  Three Dots*/}
    <View style={styles.paginationContainer}>
      {media
        .slice(0, 3)
        .map((_, index) =>
          index === activeSlide ? (
            <View key={index} style={styles.gradientDot} />
          ) : (
            <View key={index} style={styles.inactiveDot} />
          )
        )}
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
      <Text
        style={{
          color: "#8BC240",
        }}
      >
        1
      </Text>
      /<Text style={{ color: "#808080" }}>{number_of_shares}</Text>{" "}
      {i18n.t("shares")}
    </Text>
  </View>
);

const FeaturesSection = ({ number_of_bedrooms, number_of_bathrooms, area }) => (
  <View style={styles.features}>
    <View style={styles.featureItem}>
      <Furniture />
      <Text style={styles.featureText}>{area} sqft</Text>
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
      {i18n.language === "en" ? description_en : description_ar}
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
  <View style={{ padding: 20 }}>
    <View style={styles.contactCard}>
      <Text style={styles.contactTitle}>{i18n.t("getInTouchWithSophie")}</Text>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://wa.me/201100007003");
        }}
      >
        <WhatApp style={styles.whatsappIcon} />
      </TouchableOpacity>
      <Text style={styles.contactDescription}>
        {i18n.t("getInTouchDescription")}
      </Text>
      <View style={styles.personContainer}>
        <Sophie style={styles.person} />
        <Text style={styles.whatsappButtonText}>Sophie Moore</Text>
      </View>
    </View>
  </View>
);

const PriceDetailsSection = ({
  share_price,
  currency,
  number_of_shares,
  opportunityType,
  available_shares,
  unit_appreciation,
  unit_appreciation_percentage,
}) => {
  const [sliderValue, setSliderValue] = useState(1);
  const maxAllowedShares = number_of_shares / 2;

  const handleSliderChange = (value) => {
    const cappedValue = Math.min(value, maxAllowedShares);
    setSliderValue(cappedValue);
  };

  const marks = Array.from(
    { length: Math.floor(maxAllowedShares) },
    (_, i) => i + 1
  );

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.priceCard}>
        <View style={styles.pricecontent}>
          <Text style={styles.priceTitle}>
            {formatPrice(share_price)} {currency}
          </Text>
          <Text style={styles.priceSubtitle}>
            {sliderValue}/{number_of_shares} {i18n.t("shares")}
          </Text>
        </View>
        <Text style={styles.priceDetails}>{i18n.t("buyUpTo50Percent")}</Text>

        <View
          style={{
            width: "100%",
            height: 25,
            backgroundColor: "#D1E7b3",
            opacity: 0.6,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <View
            style={{
              width: `${((sliderValue / maxAllowedShares) * 100) / 2 + 5}%`,
              height: 25,
              backgroundColor: "#8BC240",
              opacity: 0.6,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 0,
              zIndex: 1,
            }}
          />
          <Slider
            style={{
              width: "50%",
              left: -2,
              justifyContent: "flex-start",
              alignSelf: "flex-start",
              height: 14,
              marginLeft: 40,
            }}
            minimumValue={1}
            maximumValue={maxAllowedShares}
            step={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            disabled={false}
            thumbTintColor="white"
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "white",
              position: "absolute",
              left: 0,
              zIndex: 2,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "48%",
              marginTop: 4,
              position: "absolute",
              left: 40,
              right: 0,
              bottom: 8,
              zIndex: 2,
            }}
          >
            {marks.map((mark, index) => (
              <Text key={index} style={{ fontSize: 12 }}>
                <TouchableOpacity
                  onPress={() => handleSliderChange(mark)}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "white",
                  }}
                />
              </Text>
            ))}
          </View>
        </View>

        <Text style={styles.Cashtitle}>{i18n.t("cashPrice")}</Text>
        <Text style={styles.priceTitle}>
          {formatPrice(share_price * sliderValue)} {currency}
        </Text>

        {opportunityType === "project" && (
          <>
            <View style={styles.priceInfo}>
              <Text style={styles.priceLabel}>
                {i18n.t("expected1YearAppreciation")}
              </Text>
              <Text style={styles.priceValue}>
                {unit_appreciation_percentage}%
              </Text>
            </View>
            <View style={styles.priceInfo}>
              <Text style={styles.priceLabel}>
                {i18n.t("expected5YearAppreciation")}
              </Text>
              <Text style={styles.priceValue}>{unit_appreciation}%</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const ROIPerYearSection = ({ data }) => (
  <View style={{ padding: 20, marginBottom: 50 }}>
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
  </View>
);

const NightsPerYearSection = ({ data }) => (
  <View style={styles.card1}>
    <Text style={styles.sectionTitle}>{i18n.t("nightsPerYear")}</Text>
    <Text style={styles.largeText}>{data?.data?.nights_per_year}</Text>
  </View>
);

const CardDetails = () => {
  const [opportunityType, setOpportunityType] = useState("property");
  const [isLiked, setisLiked] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideWidth = Dimensions.get("window").width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideWidth);
    setActiveSlide(index);
  };

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
      activeSlide,
      onScroll: handleScroll,
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
            {i18n.language === "ar" ? data?.data?.title_ar : data?.data?.title_en}
          </Text>
          <View style={styles.locationContainer}>
            <AntDesign
              name="enviromento"
              size={17}
              color="black"
              style={styles.locationicon}
            />
            <Text style={styles.location}>
              {i18n.language === "ar"
                ? data?.data?.location_ar
                : data?.data?.location_en}
            </Text>
          </View>
          <FeaturesSection
            number_of_bedrooms={data?.data?.number_of_bedrooms}
            number_of_bathrooms={data?.data?.number_of_bathrooms}
            area={data?.data?.area}
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
          unit_appreciation={data?.data?.unit_appreciation}
          unit_appreciation_percentage={data?.data?.unit_appreciation}
        />
        {opportunityType === "project" ? (
          <NightsPerYearSection data={data} />
        ) : (
          <ROIPerYearSection data={data} />
        )}
      </ScrollView>
    );
  };

  return <View>{renderContent()}</View>;
};

export default CardDetails;
