import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../../../styles/colors";
import TextComponent from "../../text/paragraph";
import H4 from "../../text/H4";

type props = {
    title: string;
    text: string;
    placeholder: string;
    setText: (e: string) => void;
};

const InputText = ({ text, setText, title, placeholder }: props) => {
    return (
        <View style={style.box}>
            <H4>{title}</H4>
            <TextInput
                onChangeText={(e) => setText(e)}
                autoCapitalize="none"
                style={style.input}
                placeholder={placeholder}>
                {text}
            </TextInput>
        </View>
    );
};

export default InputText;

const style = StyleSheet.create({
    box: {
        gap: 8
    },
    input: {
        width: "100%",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderColor: Colors.border
    }
});
