import { StyleSheet, TextInput, View } from "react-native";
import Colors from "../../../../styles/colors";
import TextComponent from "../../text/paragraph";
import H4 from "../../text/H4";

type props = {
    email: string;
    setEmail: (e: string) => void;
};

const InputEmail = ({ email, setEmail }: props) => {
    return (
        <View style={style.box}>
            <H4>Email:</H4>
            <TextInput
                onChangeText={(e) => setEmail(e)}
                autoCapitalize="none"
                style={style.input}
                placeholder="exemple@gmail.com">
                {email}
            </TextInput>
        </View>
    );
};

export default InputEmail;

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
