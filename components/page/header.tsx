import { Pressable, Text, View } from "react-native";
import BackArrow from "../../assets/icons/arrow.svg";
import { router } from "expo-router";
import styles from "./pageStyles";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <BackArrow />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default PageHeader;
