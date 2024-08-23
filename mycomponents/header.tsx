import { View, Text, StyleSheet, Dimensions } from "react-native";

type headerProps = {
    title: string;

}

const header = ({ title }: headerProps) => {
    return (
        <View style={styles.containerHeader}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default header;

const { width } = Dimensions.get("window")


const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: "#267D33",
        width: width,
        height: 55,
        justifyContent: "center",
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.9,
        shadowRadius: 15,
        // Elevation for Android
        elevation: 30,
        borderBottomWidth: 1,
        borderColor: '#FFF',
        alignItems: "center",



    },
    title: {
        fontSize: 20,
        fontFamily: "Daydream",
        color: "#FFFF"
    }
})