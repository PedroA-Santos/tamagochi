import { TouchableOpacity, StyleSheet, Text } from "react-native";

type buttonProps = {
    titleButton: string,
    onPress: () => void;
}

const button = ({ titleButton, onPress }: buttonProps) => {
    return (
        <TouchableOpacity
            style={styles.buttonPlay}
            onPress={onPress}>
            <Text style={styles.buttonText}>{titleButton}</Text>


        </TouchableOpacity>
    );
}

export default button;
const styles = StyleSheet.create({
    buttonPlay: {
        backgroundColor: '#267D33',
        padding: 15,
        borderRadius: 5,
        width: 300,
        alignItems: 'center',
        zIndex: 1,
        marginBottom: 40,
        borderWidth: 4,
        borderColor: '#fff',
        marginTop:40
        
        
    }, buttonText: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: 'Daydream',
    },
})