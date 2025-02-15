import React, { useEffect, useState } from "react";
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
import {
  useGetOpportunityQuery,
  useSellSharesOpportunityMutation,
} from "@/src/api/opportunitiesApiSlice";
import { useCreateBookingMutation } from "@/src/api/bookingsApiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import i18n from "@/i18n/i18n";
import Frame52 from "@/assets/icons/Frame52.svg";
import Frame54 from "@/assets/icons/Frame54.svg";
import Furniture from "@/assets/icons/Furniture.svg";
import WhatApp from "@/assets/icons/whatsapp.svg";
import styles from "./CardDetails";
import FilledHeart from "@/assets/icons/filledHeart.svg";
import MultiUsers from "@/assets/icons/multiUsers.svg";
import { Slider } from "@miblanchard/react-native-slider";
import AppText from "@/commonComponent/appText/AppText";
import Button from "@/commonComponent/button/Button";
import CalendarModal from "@/components/Bookings/CalendarModal";
import { format } from "date-fns";

import { Opportunity } from "@/src/interfaces/opportunity.interface";
import {
  useGetWishListQuery,
  usePostWishListMutation,
  useRemoveWishListMutation,
} from "@/src/wishList/wishListApiSlice";
import { useSelector, useDispatch } from "react-redux";
import BgRightCircle from "../../assets/icons/bgRightCircle.svg";
import { useOpportunityRegisterInterestMutation } from "@/src/api/opportunitiesApiSlice";
import { t } from "i18next";
import HaveNightsCard from "./components/haveNightsCard";
import EstimatedSalesRangeCard from "./components/estimatedSalesRangeCard";
import TotalReturnCard from "./components/totalReturnCard";
import TotalRentIncome from "./components/totalRentIncome";
import DynamicIcon from "@/utils/RenderAmenitiesIcons";
import { noImagePlaceHolder } from "@/utils/noImagePlaceHolder";

const Header = ({
  media,
  onBackPress,
  onLikePress,
  isLiked,
  activeSlide,
  onScroll,
}) => (
  <View style={[styles.header, { direction: "ltr" }]}>
    <FlatList
      data={media?.slice(0, 3)}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        direction: i18n.language === "en" ? "ltr" : "rtl",
      }}
      inverted={i18n.language === "ar"}
      style={{
        flex: 1,
      }}
      renderItem={({ item }) => (
        <Image
          source={{
            uri: item.url ? item.url : noImagePlaceHolder,
          }}
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
    <View
      style={[
        styles.icons,
        { direction: i18n.language === "ar" ? "rtl" : "ltr" },
      ]}
    >
      <TouchableOpacity style={styles.icon1} onPress={onBackPress}>
        {i18n.language === "en" ? (
          <Ionicons name="chevron-back" size={16} color="black" />
        ) : (
          <Ionicons name="chevron-forward" size={16} color="black" />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon2} onPress={onLikePress}>
        {isLiked ? (
          <FilledHeart />
        ) : (
          <Ionicons name={"heart-outline"} size={30} color={"black"} />
        )}
      </TouchableOpacity>
    </View>

    <View
      style={[
        styles.paginationContainer,
        i18n.language === "ar"
          ? { flexDirection: "row-reverse" }
          : { flexDirection: "row" },
      ]}
    >
      {media
        ?.slice(0, 3)
        ?.map((_, index) =>
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
  owned_shares,
  number_of_shares,
  status,
}) => {
  return (
    <View
      style={[
        styles.priceSection,
        {
          justifyContent:
            status === "sold out" ? "space-between" : "flex-start",
        },
      ]}
    >
      <AppText
        text={`${
          i18n.language === "en"
            ? share_price.toLocaleString()
            : share_price.toLocaleString("ar-EG")
        } ${t(currency)} `}
        style={styles.price}
      />

      <View style={{ display: "flex", flexDirection: i18n.language === "ar" ? "row-reverse" : "row", gap: 3, alignItems: "center"}}>
        <AppText text={i18n.t("shares") + " "} style={styles.shares} />
        <AppText
          text={`${
            i18n.language === "en"
              ? owned_shares
              : owned_shares.toLocaleString("ar-EG")
          }`}
          style={{
            color: "#8BC240",
            fontWeight: "500",
            fontFamily: "InterMedium",
            fontSize: 14,
          }}
        />
        <Text>/</Text>
        <AppText
          style={{
            color: "#464851",
            fontWeight: "500",
            fontSize: 14,
            fontFamily: "InterMedium",
          }}
          text={
            i18n.language === "en"
              ? number_of_shares
              : number_of_shares.toLocaleString("ar-EG")
          }
        />
      </View>
      {status === "sold out" && (
        <View
          style={{
            height: 30,
            width: 80,
            alignSelf: "center",
            borderRadius: 10,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.soldOutLabel}>{i18n.t("soldOut")}</Text>
        </View>
      )}
    </View>
  );
};

const FeaturesSection = ({ number_of_bedrooms, number_of_bathrooms, area }) => (
  <View style={styles.features}>
    <View style={styles.featureItem}>
      <Furniture />
      <AppText
        text={`${
          i18n.language === "en" ? area : area.toLocaleString("ar-EG")
        } ${i18n.t("sqft")}`}
        style={styles.featureText}
      />
    </View>
    <View style={styles.featureItem}>
      <Frame52 />
      <AppText
        style={styles.featureText}
        text={i18n.t("bedrooms", {
          count:
            i18n.language === "en"
              ? number_of_bedrooms
              : number_of_bedrooms.toLocaleString("ar-EG"),
        })}
      />
    </View>
    <View style={styles.featureItem}>
      <Frame54 />
      <AppText
        text={i18n.t("bathroom", {
          count:
            i18n.language === "en"
              ? number_of_bathrooms
              : number_of_bathrooms.toLocaleString("ar-EG"),
        })}
        style={styles.featureText}
      />
    </View>
  </View>
);

const BadgeAndDescription = ({ description_en, description_ar }) => (
  <View>
    <AppText text={i18n.t("description")} style={styles.descriptionTitle} />

    <AppText
      text={i18n.language === "en" ? description_en : description_ar}
      style={styles.description}
    />
  </View>
);

const AmenitiesSection = ({ data }) => {
  return (
    <View style={styles.amenitiesFeatures}>
      {data?.amenities?.map((amenity) => (
        <View key={amenity} style={styles.amenitiesItem}>
          <DynamicIcon IconType={amenity} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.amenitiesFeatureText}
          >
            {t(`${amenity}`)}
          </Text>
        </View>
      ))}
    </View>
  );
};

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
        <WhatApp
          style={[
            styles.whatsappIcon,
            i18n.language === "en" ? { right: 0 } : { left: 0 },
          ]}
        />
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
        <AppText text={t("ahmedHassan")} style={styles.whatsappButtonText} />
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
            text={`${
              i18n.language === "en"
                ? share_price
                : share_price.toLocaleString("ar-EG")
            } ${t(`${currency}`)}`}
            style={styles.priceTitle}
          />
          <AppText
            text={`${
              i18n.language === "en"
                ? sliderValue
                : sliderValue.toLocaleString("ar-EG")
            }/${
              i18n.language === "en"
                ? number_of_shares
                : number_of_shares.toLocaleString("ar-EG")
            } ${i18n.t("shares")}`}
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
              direction: "ltr",
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
          text={`${
            i18n.language === "en"
              ? (share_price * sliderValue).toLocaleString()
              : (share_price * sliderValue).toLocaleString("ar-EG")
          } ${t(`${currency}`)}`}
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
                text={`${
                  i18n.language === "en"
                    ? `${total_return_1_year}%`
                    : `%${total_return_1_year.toLocaleString("ar-EG")}`
                }`}
                style={styles.priceValue}
              />
            </View>
            <View style={styles.priceInfo}>
              <AppText
                text={i18n.t("expected5YearAppreciation")}
                style={styles.priceLabel}
              />
              <AppText
                text={`${
                  i18n.language === "en"
                    ? `${total_return_5_years}%`
                    : `%${total_return_5_years.toLocaleString("ar-EG")}`
                }`}
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
  <View
    style={{
      padding: 20,
      marginBottom: data?.data?.owned_shares > 0 ? 0 : 50,
    }}
  >
    <View style={styles.card}>
      <AppText text={i18n.t("ROI-Rental Rev")} style={styles.sectionTitle} />
      <View>
        <AppText
          text={`${i18n.t("From")} ${
            i18n.language === "en"
              ? data?.data?.roi_revenue_from
              : data?.data?.roi_revenue_from.toLocaleString("ar-EG")
          }% ${i18n.t("To")} ${
            i18n.language === "en"
              ? data?.data?.roi_revenue_to
              : data?.data?.roi_revenue_to.toLocaleString("ar-EG")
          }%`}
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
            i18n.language === "en"
              ? data?.data?.roi_appreciation_from
              : data?.data?.roi_appreciation_from.toLocaleString("ar-EG")
          }% ${i18n.t("To")} ${
            i18n.language === "en"
              ? data?.data?.roi_appreciation_to
              : data?.data?.roi_appreciation_to.toLocaleString("ar-EG")
          }%`}
          style={styles.fromToText}
        />
      </View>
    </View>
  </View>
);

const NightsPerYearSection = ({ data, sliderValue }) => {
  return (
    <View>
      {data?.data?.owned_shares === 0 ? (
        <View style={styles.card1}>
          <AppText text={i18n.t("nightsPerYear")} style={styles.sectionTitle} />
          <AppText
            text={`${
              i18n.language === "en"
                ? Math.floor(365 / data?.data.number_of_shares) * sliderValue
                : (
                    Math.floor(365 / data?.data.number_of_shares) * sliderValue
                  ).toLocaleString("ar-EG")
            }`}
            style={styles.largeText}
          />
        </View>
      ) : (
        <>
          <TotalReturnCard data={data} />
          {data?.data?.number_of_nights ?
            data?.data?.opportunity_type === "project" ? (
              <TotalRentIncome data={data} />
            ) : data?.data?.opportunity_type === "property" ? (
              <HaveNightsCard data={data} />
            ) : null
          : null}
          <EstimatedSalesRangeCard data={data} />
        </>
      )}
    </View>
  );
};

const CardDetails = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();
  const { id, type } = useLocalSearchParams();
  const { data: wishList, refetch } = useGetWishListQuery({});

  const dispatch = useDispatch();
  const [handleRegisterInterest] = useOpportunityRegisterInterestMutation();
  const [isRegistered, setIsRegistered] = React.useState(false);
  const user = useSelector((state: any) => state?.user.user);
  const [postWishList] = usePostWishListMutation();
  const [removeWishList] = useRemoveWishListMutation();
  const [isWantToSellModal, setIsWantToSellModal] = useState(false);
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [createBooking] = useCreateBookingMutation();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: queryRefetch,
  } = useGetOpportunityQuery(
    { id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    if (!isCalendarModalVisible) {
      queryRefetch();
    }
  }, [isCalendarModalVisible]);

  const handleGoogleClick = () => {
    Linking.openURL("https://www.google.com");
  };

  const handlePlaceholderClick = async () => {
    try {
      const body = {
        email: user?.email,
        phone: user?.phone_number,
        full_name: user?.name,
      };
      await handleRegisterInterest({
        id,
        body,
      }).unwrap();

      setIsRegistered(true);
    } catch (e) {
      console.log(e);
    }
  };
  const isLiked = wishList?.data?.some(
    (likedItem: Opportunity) => likedItem.id === Number(id)
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

  const handleLoveIconPress = async (id: number) => {
    try {
      if (isLiked) {
        await removeWishList({ id }).unwrap();
      } else {
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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideWidth = Dimensions.get("window").width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideWidth);
    setActiveSlide(index);
  };
  const [sellOpportunityShares] = useSellSharesOpportunityMutation();
  const [isSelling, setIsSelling] = useState(false);

  const handleSellOpportunityShares = async () => {
    try {
      setIsSelling(true);
      const response = await sellOpportunityShares({ id }).unwrap();
      setIsWantToSellModal(false);
      setIsSelling(false);
    } catch (error) {
      console.error("Failed to sell opportunity shares:", error);
      setIsSelling(false);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
    }
  };

  const handleBookNow = () => {
    setIsCalendarModalVisible(true);
  };

  const handleConfirmBooking = async (
    startDate: string | null,
    endDate: string | null
  ) => {
    if (!startDate || !endDate) {
      Alert.alert(t("common.error"), t("bookings.calendar.selectDates"));
      return false;
    }

    const formattedStartDate = format(new Date(startDate), "yyyy-MM-dd");
    const formattedEndDate = format(new Date(endDate), "yyyy-MM-dd");

    try {
      await createBooking({
        from: formattedStartDate,
        to: formattedEndDate,
        property_id: Number(id),
        customer_id: user.id,
      }).unwrap();

      return true;
    } catch (error) {
      console.error("Booking error:", error);
      return false;
    }
  };

  const renderContent = () => {
    const [sliderValue, setSliderValue] = useState(1);
    const commonProps = {
      media: data?.data?.media,
      onBackPress: () => router.push("/"),
      onLikePress: () => handleLoveIconPress(Number(id)),
      isLiked,
      data: data?.data,
      activeSlide,
      onScroll: handleScroll,
    };
    const sectionToRender =
      data?.data?.opportunity_type === "property" ||
      data?.data?.owned_shares > 0 ? (
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

    if (isError)
      return (
        <SafeAreaView
          style={[
            styles.container,
            { flex: 1, alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text>{i18n.t("error")}</Text>
        </SafeAreaView>
      );

    if (!data?.data)
      return (
        <SafeAreaView
          style={[
            styles.container,
            { flex: 1, alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text>{i18n.t("noData")}</Text>
        </SafeAreaView>
      );

    return (
      <SafeAreaView
        style={[
          styles.container,
          { direction: i18n.language === "ar" ? "rtl" : "ltr" },
        ]}
      >
        <ScrollView style={styles.container}>
          <Header {...commonProps} />
          <View style={styles.detailsCard}>
            <PriceSection
              share_price={data?.data?.share_price}
              currency={data?.data?.currency}
              available_shares={data?.data?.available_shares}
              number_of_shares={data?.data?.number_of_shares}
              status={data?.data?.status}
              owned_shares={data?.data?.owned_shares}
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
            {data?.data?.owned_shares > 0 && (
              <Text
                style={{
                  marginVertical: 10,
                  color: "#464851",
                  fontFamily: "InterMedium",
                  fontSize: 16,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {t("youOwn")}{" "}
                <Text
                  style={{
                    color: "#8BC240",
                    fontSize: 16,
                    fontFamily: "InterMedium",
                    fontWeight: "500",
                  }}
                >
                  {data?.data?.owned_shares}
                </Text>
                /{data?.data?.number_of_shares} Shares on this property
              </Text>
            )}

            <View style={styles.badge}>
              {data?.data.owned_shares !== 0 && <MultiUsers />}
              <AppText
                text={
                  data?.data.owned_shares === 0
                    ? data?.data?.opportunity_type === "project"
                      ? i18n.t("commercial")
                      : i18n.t("residential")
                    : i18n.t("inverstors", {
                        investors:
                          i18n.language === "en"
                            ? data?.data?.investors
                            : data?.data?.investors.toLocaleString("ar-EG"),
                      })
                }
                style={styles.badgeText}
              />
            </View>

            {data?.data?.owned_shares > 0 && sectionToRender}

            <BadgeAndDescription
              description_en={data?.data?.description_en}
              description_ar={data?.data?.description_ar}
            />
            <AmenitiesSection data={data?.data} />
          </View>

          <View
            style={{ marginBottom: data?.data?.owned_shares !== 0 ? 150 : 0 }}
          >
            <ContactSection />
          </View>
          {data?.data?.owned_shares === 0 && (
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
          )}
          {data?.data?.owned_shares === 0 && sectionToRender}

          <Modal
            visible={isRegistered}
            transparent={true}
            animationType="slide"
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.5)",
                height: Dimensions.get("window").height,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 300,
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: -80,
                    right: 20,
                    height: 48,
                    width: 48,
                    borderRadius: 24,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#0E0E0E",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.04,
                    shadowRadius: 1,
                    elevation: 1,
                  }}
                  onPress={() => setIsRegistered(false)}
                >
                  <Ionicons name="close" size={20} color="#171513" />
                </TouchableOpacity>
                <View>
                  <BgRightCircle />
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "semibold",
                    fontFamily: "InterSemiBold",
                    marginBottom: 5,
                    color: "#191D1A",
                    marginVertical: 20,
                  }}
                >
                  {t("thankYouForYourInterest")}
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    color: "#464851",
                    fontFamily: "NunitoSansRegular",
                    fontWeight: "400",
                    textAlign: "center",
                    marginTop: 5,
                  }}
                >
                  {t("registrationSuccess1")}
                  {t("registrationSuccess2")}
                </Text>
              </View>
            </View>
          </Modal>
        </ScrollView>
        {data?.data?.owned_shares === 0 ? (
          <View style={styles.tabContainer}>
            <Button style={styles.buttonGreen} onPress={handleGoogleClick}>
              {t("scheduleCall")}
            </Button>
            <Button style={styles.buttonDark} onPress={handlePlaceholderClick}>
              {t("registerInterest")}
            </Button>
          </View>
        ) : (
          <View style={styles.tabContainer}>
            {data?.data?.opportunity_type === "property" && (
              <Button style={styles.buttonGreen} onPress={handleBookNow}>
                {t("bookRightNow")}
              </Button>
            )}
            <Button
              style={styles.buttonDark}
              onPress={() => setIsWantToSellModal(true)}
            >
              {t("wantToSell")}
            </Button>
          </View>
        )}
        <Modal
          visible={isWantToSellModal}
          transparent={true}
          animationType="slide"
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              backgroundColor: "rgba(0,0,0,0.5)",
              height: Dimensions.get("window").height,
              paddingTop: 80,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                height: 345,
                width: "100%",
                paddingVertical: 20,
                backgroundColor: "white",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  borderBottomColor: "#E2E2EA",
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                  }}
                >
                  <AppText
                    style={{
                      color: "#2B2B2B",
                    }}
                    text={t("pleaseConfirm")}
                  />
                  <TouchableOpacity onPress={() => setIsWantToSellModal(false)}>
                    <Ionicons name="close" size={20} color="#92929D" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ padding: 20 }}>
                <AppText
                  style={{
                    color: "#464851",
                    fontFamily: "InterRegular",
                    fontSize: 16,
                    fontWight: "400",
                    lineHeight: 26,
                  }}
                  text={t("sellDescription")}
                />
              </View>

              <View style={styles.tabContainer}>
                <Button
                  style={[styles.buttonGreen, { borderRadius: 10 }]}
                  onPress={handleSellOpportunityShares}
                  isLoading={isSelling}
                >
                  {isSelling ? t("loading") : t("yesConfirm")}
                </Button>
                <Button
                  style={[
                    styles.buttonDark,
                    {
                      borderRadius: 10,
                      backgroundColor: "white",
                      borderColor: "#E7EAE9",
                      borderWidth: 1
                    },
                  ]}
                  onPress={() => setIsWantToSellModal(false)}
                >
                  <Text style={{ color: "#464851" }}>{t("cancel")}</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <CalendarModal
          isVisible={isCalendarModalVisible}
          onClose={() => setIsCalendarModalVisible(false)}
          onConfirm={handleConfirmBooking}
          availableNights={data?.data?.available_nights || 0}
        />
      </SafeAreaView>
    );
  };

  return <View style={[styles.container, { flex: 1 }]}>{renderContent()}</View>;
};

export default CardDetails;
