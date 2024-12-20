import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { IText } from "../../../../types/IText";
import Colors from "../../../../styles/colors";
import TextComponent from "../../text/paragraph";
import Svg, { G, Path } from "react-native-svg";
import { useState } from "react";
import H4 from "../../text/H4";

type props = {
    password: string;
    setPassword: (e: string) => void;
    title: string;
};

const EyeIcon = () => (
    <Svg
        width="15.476"
        height="15.476"
        viewBox="0 0 15.476 15.476">
        <G
            id="vuesax_outline_eye"
            transform="translate(-108 -188)">
            <G
                id="eye"
                transform="translate(108 188)">
                <Path
                    id="Vector"
                    d="M2.792,5.584A2.792,2.792,0,1,1,5.584,2.792,2.793,2.793,0,0,1,2.792,5.584Zm0-4.617A1.825,1.825,0,1,0,4.617,2.792,1.827,1.827,0,0,0,2.792.967Z"
                    transform="translate(4.946 4.946)"
                    fill="#cecece"
                />
                <Path
                    id="Vector-2"
                    d="M6.8,11.633A7.612,7.612,0,0,1,.513,7.751a3.906,3.906,0,0,1,0-3.869A7.629,7.629,0,0,1,6.8,0,7.61,7.61,0,0,1,13.08,3.882a3.906,3.906,0,0,1,0,3.869A7.61,7.61,0,0,1,6.8,11.633ZM6.8.967A6.66,6.66,0,0,0,1.332,4.4a2.93,2.93,0,0,0,0,2.824A6.66,6.66,0,0,0,6.8,10.665a6.66,6.66,0,0,0,5.468-3.437,2.93,2.93,0,0,0,0-2.824A6.66,6.66,0,0,0,6.8.967Z"
                    transform="translate(0.938 1.922)"
                    fill="#cecece"
                />
                <Path
                    id="Vector-3"
                    d="M0,0H15.476V15.476H0Z"
                    fill="none"
                    opacity="0"
                />
            </G>
        </G>
    </Svg>
);
const inputPassword = ({ password, setPassword, title }: props) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View style={style.box}>
            <H4>Password:</H4>
            <View style={style.input}>
                <TextInput
                    onChangeText={(e) => setPassword(e)}
                    style={style.text}
                    placeholder="*********"
                    secureTextEntry={!showPassword}>
                    {password}
                </TextInput>
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <EyeIcon />
                </Pressable>
            </View>
        </View>
    );
};

export default inputPassword;

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
        borderColor: Colors.border,
        flexDirection: "row"
    },
    text: {
        width: "95%"
    }
});
