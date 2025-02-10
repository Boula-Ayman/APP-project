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
  NativeSyntheticEvent,
  NativeScrollEvent,
  Linking,
  Alert,
  SafeAreaView,
  Modal,
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
import { StatusBar } from "expo-status-bar";
import { Slider } from "@miblanchard/react-native-slider";
import AppText from "@/commonComponent/appText/AppText";

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
    <AppText
      text={formatPrice(share_price) + " " + currency}
      style={styles.price}
    />
    <AppText text={i18n.t("shares") + " "} style={styles.shares} />
    <AppText
      text="1/"
      style={{
        color: "#8BC240",
        fontWeight: "500",
        fontFamily: "InterMedium",
        fontSize: 14,
      }}
    />
    <AppText
      style={{
        color: "#464851",
        fontWeight: "500",
        fontSize: 14,
        fontFamily: "InterMedium",
      }}
      text={number_of_shares}
    />
  </View>
);

const FeaturesSection = ({ number_of_bedrooms, number_of_bathrooms, area }) => (
  <View style={styles.features}>
    <View style={styles.featureItem}>
      <Furniture />
      <AppText text={`${area} sqft`} style={styles.featureText} />
    </View>
    <View style={styles.featureItem}>
      <Frame52 />
      <AppText
        style={styles.featureText}
        text={i18n.t("bedrooms", { count: number_of_bedrooms })}
      />
    </View>
    <View style={styles.featureItem}>
      <Frame54 />
      <AppText
        text={i18n.t("bathroom", { count: number_of_bathrooms })}
        style={styles.featureText}
      />
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
      <AppText
        text={
          opportunity_type === "project"
            ? i18n.t("commercial")
            : i18n.t("residential")
        }
        style={styles.badgeText}
      />
    </View>
    <AppText text={i18n.t("description")} style={styles.descriptionTitle} />

    <AppText
      text={i18n.language === "en" ? description_en : description_ar}
      style={styles.description}
    />
  </View>
);

const AmenitiesSection = ({ data }) => (
  <View style={styles.amenitiesFeatures}>
    <View style={styles.amenitiesItem}>
      <Frame52 />
      <AppText
        text={data?.number_of_bedrooms}
        style={styles.amenitiesFeatureNum}
      />
      <AppText
        text={i18n.t("bedroomsam")}
        style={styles.amenitiesFeatureText}
      />
    </View>
    <View style={styles.amenitiesItem}>
      <Frame54 />
      <AppText
        text={data?.number_of_bathrooms}
        style={styles.amenitiesFeatureNum}
      />
      <AppText
        text={i18n.t("bathroomam")}
        style={styles.amenitiesFeatureText}
      />
    </View>
    <View style={styles.amenitiesItem}>
      <Chandelier style={styles.icon} />
      <AppText text="2" style={styles.amenitiesFeatureNum} />
      <AppText
        text={i18n.t("SittingArea")}
        style={styles.amenitiesFeatureText}
      />
    </View>
    <View style={styles.amenitiesItem}>
      <Fridge style={styles.icon} />
      <AppText
        text={data?.number_of_bathrooms}
        style={styles.amenitiesFeatureNum}
      />
      <AppText text={i18n.t("Kitchen")} style={styles.amenitiesFeatureText} />
    </View>
  </View>
);

const ContactSection = () => (
  <View style={{ padding: 20 }}>
    <View style={styles.contactCard}>
      <AppText
        text={i18n.t("getInTouchWithSophie")}
        style={styles.contactTitle}
      />
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://wa.me/201100007003");
        }}
      >
        <WhatApp style={styles.whatsappIcon} />
      </TouchableOpacity>
      <AppText
        text={i18n.t("getInTouchDescription")}
        style={styles.contactDescription}
      />
      <View style={styles.personContainer}>
        <Image
          source={require("@/assets/Images/personAI.jpg")}
          style={styles.person}
        />
        <AppText text="Ahmed Hassan" style={styles.whatsappButtonText} />
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
  total_return_1_year,
  total_return_5_years,
  sliderValue,
  setSliderValue,
}) => {
  const maxAllowedShares = number_of_shares / 2;

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const marks = Array.from(
    { length: Math.floor(maxAllowedShares) },
    (_, i) => i + 1
  );

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.priceCard}>
        <View style={styles.pricecontent}>
          <AppText
            text={`${formatPrice(share_price)} ${currency}`}
            style={styles.priceTitle}
          />
          <AppText
            text={`${sliderValue}/${number_of_shares} ${i18n.t("shares")}`}
            style={styles.priceSubtitle}
          />
        </View>
        <AppText
          text={i18n.t("buyUpTo50Percent")}
          style={styles.priceDetails}
        />

        <View
          style={{
            width: "100%",
            height: 14,
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
              width: `12%`,
              height: 14,
              backgroundColor: "#8BC240",
              opacity: 0.6,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: "0%",
              zIndex: 1,
            }}
          />
          <Slider
            value={sliderValue}
            onValueChange={handleSliderChange}
            step={1}
            minimumValue={1}
            maximumValue={maxAllowedShares}
            minimumTrackTintColor="#8BC240"
            maximumTrackTintColor="transparent"
            animationType="timing"
            animateTransitions
            minimumTrackStyle={{
              opacity: 0.6,
              height: 14,
              borderRadius: 20,
            }}
            thumbTintColor="white"
            renderTrackMarkComponent={(trackProps: any) => {
              const isActiveMark = marks[trackProps] === sliderValue[0];
              return (
                <TouchableOpacity
                  onPress={() => handleSliderChange(trackProps.value)}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "white",
                    display: isActiveMark ? "none" : "flex",
                  }}
                />
              );
            }}
            trackMarks={marks}
            trackStyle={{
              width: "50%",
              height: 14,
              opacity: 1,
              borderRadius: 20,
              backgroundColor: "transparent",
            }}
            containerStyle={{
              width: "50%",
              height: 14,
              backgroundColor: "transparent",
              opacity: 1,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "flex-start",
              position: "absolute",
              left: 0,
              zIndex: 1,
              marginLeft: "10%",
            }}
            thumbImage={require("@/assets/icons/whiteCircle.svg")}
            thumbStyle={{
              width: 12,
              height: 12,
              borderRadius: 5,
              backgroundColor: "white",
              position: "absolute",
              left: 0,
              zIndex: 2,
              opacity: 1,
            }}
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
        </View>

        <AppText text={i18n.t("cashPrice")} style={styles.cashPriceTitle} />
        <AppText
          text={`${formatPrice(share_price * sliderValue)} ${currency}`}
          style={styles.cashPriceInfo}
        />

        {opportunityType === "project" && (
          <>
            <View style={styles.priceInfo}>
              <AppText
                text={i18n.t("expected1YearAppreciation")}
                style={styles.priceLabel}
              />
              <AppText
                text={`${total_return_1_year}%`}
                style={styles.priceValue}
              />
            </View>
            <View style={styles.priceInfo}>
              <AppText
                text={i18n.t("expected5YearAppreciation")}
                style={styles.priceLabel}
              />
              <AppText
                text={`${total_return_5_years}%`}
                style={styles.priceValue}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const ROIPerYearSection = ({ data }) => (
  <View style={{ padding: 20, marginBottom: 150 }}>
    <View style={styles.card}>
      <AppText text={i18n.t("ROI-Rental Rev")} style={styles.sectionTitle} />
      <View>
        <AppText
          text={`${i18n.t("From")} ${data?.data?.roi_revenue_from}% ${i18n.t(
            "To"
          )} ${data?.data?.roi_revenue_to}%`}
          style={styles.fromToText}
        />
      </View>
      <AppText text="" style={styles.bar} />
      <View>
        <AppText
          text={i18n.t("ROI-Expected Appreciation")}
          style={styles.sectionTitle}
        />
        <AppText
          text={`${i18n.t("From")} ${
            data?.data?.roi_appreciation_from
          }% ${i18n.t("To")} ${data?.data?.roi_appreciation_to}%`}
          style={styles.fromToText}
        />
      </View>
    </View>
  </View>
);

const NightsPerYearSection = ({ data, sliderValue }) => (
  <View style={styles.card1}>
    <AppText text={i18n.t("nightsPerYear")} style={styles.sectionTitle} />
    <AppText
      text={`${Math.floor(365 / data?.data.number_of_shares) * sliderValue}`}
      style={styles.largeText}
    />
  </View>
);

const CardDetails = () => {
  const [isLiked, setisLiked] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();
  const { id, type } = useLocalSearchParams();
  const { data, isLoading, isError, error } = useGetOpportunityQuery(
    { id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  // you can check if the user has already shares or no by owned_shares (youssef bahgat)

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

  const renderContent = () => {
    const [sliderValue, setSliderValue] = useState(1);
    const commonProps = {
      media: data?.data?.media,
      onBackPress: () => router.push("/"),
      onLikePress: toggleLike,
      isLiked,
      data: data?.data,
      activeSlide,
      onScroll: handleScroll,
    };
    const sectionToRender =
      data?.data?.opportunity_type === "project" ? (
        <NightsPerYearSection
          data={data}
          sliderValue={sliderValue}
          key="nights"
        />
      ) : (
        <ROIPerYearSection data={data} key="roi" />
      );
    if (isLoading)
      return (
        <SafeAreaView
          style={[
            styles.container,
            { flex: 1, alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text>{i18n.t("loading")}</Text>
        </SafeAreaView>
      );
    if (error)
      return (
        <SafeAreaView
          style={[
            styles.container,
            { flex: 1, alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text>{i18n.t("errorOccurred")}</Text>
        </SafeAreaView>
      );
    if (!data)
      return (
        <View
          style={[
            styles.container,
            { flex: 1, alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text>{i18n.t("noDataAvailable")}</Text>
        </View>
      );

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
            {i18n.language === "ar"
              ? data?.data?.title_ar
              : data?.data?.title_en}
          </Text>
          <View style={styles.locationContainer}>
            <AntDesign name="enviromento" size={20} color="#808080" />
            <AppText
              text={
                i18n.language === "ar"
                  ? data?.data?.location_ar
                  : data?.data?.location_en
              }
              style={styles.location}
            />
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
          opportunityType={data?.data?.opportunity_type}
          unit_appreciation={data?.data?.unit_appreciation}
          unit_appreciation_percentage={data?.data?.unit_appreciation}
          total_return_1_year={data?.data?.total_return_1_year}
          total_return_5_years={data?.data?.total_return_5_years}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
        />
        {sectionToRender}
      </ScrollView>
    );
  };

  return <View style={[styles.container, { flex: 1 }]}>{renderContent()}</View>;
};

export default CardDetails;
