import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../../styles/colors";

type props = {
    text: string;
    action: () => void;
    loading: boolean;
    status: boolean;
    type: string;
};
const Button = ({ text, action, loading, type, status }: props) => {
    return status ? (
        <Pressable
            onPress={action}
            style={style.container}>
            {loading ? (
                <Image
                    style={style.image}
                    resizeMode="contain"
                    source={require("./../../../assets/gifs/btnloadin.gif")}
                />
            ) : (
                <Text style={style.text}>{text}</Text>
            )}
        </Pressable>
    ) : (
        <View style={[style.container, !status && style.inactive]}>
            <Text style={style.text}>{text}</Text>
        </View>
    );
};

export default Button;

const style = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 32,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor: Colors.primary,
        minHeight: 42,
        alignSelf: "center",
        minWidth: 200
    },
    image: {
        width: 32,
        height: 16
    },

    inactive: {
        opacity: 0.5
    },
    text: {
        fontWeight: "bold",
        fontSize: 14
    }
});
