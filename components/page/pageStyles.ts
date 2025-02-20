import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        // marginTop: 50,
        marginBottom: 20,
        height: 48,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: { 
        position: "absolute",
        left: 10,
        backgroundColor: "#F6F6F6",
        borderRadius: '50%',
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Inter',
        marginInline: "auto",
        fontWeight: 700,
        color: "#000",
    }
});

export default styles;
