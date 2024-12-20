import { Pressable, StyleSheet, Switch, View } from "react-native";
import TextComponent from "../../global/text/paragraph";
import Colors from "../../../styles/colors";
import Paragraph from "../../global/text/paragraph";

interface type {
    remember: boolean;
    setRemember: (e: boolean) => void;
}
const Remember = ({ remember, setRemember }: type) => {
    return (
        <Pressable
            onPress={() => setRemember(!remember)}
            style={style.container}>
            <Paragraph>Remember-me</Paragraph>
            <Switch
                value={remember}
                onValueChange={() => setRemember(!remember)}
                trackColor={{ false: "#fff", true: Colors.primary }}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
        </Pressable>
    );
};

export default Remember;

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});
