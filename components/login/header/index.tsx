import { Pressable, StyleSheet, View } from "react-native";
import TextH2 from "../../global/text/paragraph";
import { Dispatch, SetStateAction } from "react";
import Colors from "../../../styles/colors";
import TextComponent from "../../global/text/paragraph";
import H1 from "../../global/text/H1";

type props = {
    menu: string;
    setMenu: Dispatch<SetStateAction<string>>;
};

const LoginHeader = ({ menu, setMenu }: props) => {
    return (
        <View style={style.container}>
            <Pressable
                onPress={() => setMenu("login")}
                style={menu == "login" ? style.seleted : style.noSelected}>
                <H1>Login</H1>
            </Pressable>
            <Pressable
                onPress={() => setMenu("register")}
                style={menu == "register" ? style.seleted : style.noSelected}>
                <H1>Register</H1>
            </Pressable>
        </View>
    );
};

export default LoginHeader;

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 32
    },
    seleted: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 3
    },
    noSelected: {
        borderBottomColor: Colors.transparent,
        borderBottomWidth: 3,
        opacity: 0.3
    }
});
