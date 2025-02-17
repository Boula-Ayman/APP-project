import {
  useGetCurrentUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/src/api/userApiSlice";
import {
  formatDateToISO,
  formatDateForDisplay,
} from "../../../utils/dateUtils";
import i18n from "../../../i18n/i18n";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";

interface FormData {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  dateOfBirth: string;
  mobileNumber: string;
  countryCode: string;
  photo: string | null;
}

export const useAccountForm = () => {
  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    refetch,
  } = useGetCurrentUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const getInitialValues = (): FormData => {
    if (userProfile?.data) {
      const user = userProfile.data;
      const [firstName, ...lastNameParts] = user.name.split(" ");
      const lastName = lastNameParts.join(" ");

      return {
        firstName: firstName || "",
        lastName: lastName || "",
        gender: user.gender || "male",
        dateOfBirth: formatDateForDisplay(user.birth_date || null) || "",
        mobileNumber: user.phone_number?.replace("+20", "") || "",
        countryCode: "+20",
        photo: user.image_url || null,
      };
    }

    return {
      firstName: "",
      lastName: "",
      gender: "male",
      dateOfBirth: "",
      mobileNumber: "",
      countryCode: "+20",
      photo: null,
    };
  };

  const handleSubmit = async (values: FormData) => {
    try {
      const formattedDate = formatDateToISO(values.dateOfBirth);

      if (values.dateOfBirth && !formattedDate) {
        Toast.show({
          type: "error",
          text1: i18n.t("settings.invalidDateFormat"),
          text2: i18n.t("settings.useDateFormat"),
        });
        return;
      }

      const updateData = {
        name: `${values.firstName} ${values.lastName}`.trim(),
        gender: values.gender,
        birth_date: formattedDate || null,
        phone_number: values.mobileNumber
          ? values.countryCode + values.mobileNumber
          : null,
        image_url: values.photo,
        email: userProfile?.data?.email || "",
      };

      await updateProfile(updateData).unwrap();
      await verifyUpdate(updateData);

      Alert.alert(
        i18n.t("common.success"),
        i18n.t("settings.profileUpdateSuccess"),
        [{ text: i18n.t("common.ok"), onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.error("Error updating account info:", error);
      Toast.show({
        type: "error",
        text1: i18n.t("settings.profileUpdateError"),
        text2: error?.data?.message || error?.message || i18n.t("common.error"),
      });
    }
  };

  const verifyUpdate = async (updateData: any) => {
    const refreshResult = await refetch();

    if (refreshResult.error) {
      throw new Error("Failed to verify update");
    }

    const updatedProfile = refreshResult.data?.data;
    if (updatedProfile) {
      const verificationFailed: string[] = [];

      const fieldsToVerify: Partial<
        Record<keyof typeof updatedProfile, string | null>
      > = {
        name: updateData.name,
        gender: updateData.gender,
        birth_date: updateData.birth_date,
        phone_number: updateData.phone_number,
        image_url: updateData.image_url,
      };

      Object.entries(fieldsToVerify).forEach(([key, value]) => {
        if (value !== null) {
          let serverValue = updatedProfile[key];

          if (key === "birth_date" && typeof serverValue === "string") {
            serverValue = new Date(serverValue)?.toISOString()?.split("T")[0];
            value = String(value);
          }

          if (serverValue !== value) {
            verificationFailed.push(key.replace(/_/g, " "));
          }
        }
      });

      if (verificationFailed.length > 0) {
        throw new Error(
          `Update verification failed for: ${verificationFailed.join(", ")}`
        );
      }
    }
  };

  return {
    isLoadingProfile,
    isUpdating,
    getInitialValues,
    handleSubmit,
    refetch,
  };
};
