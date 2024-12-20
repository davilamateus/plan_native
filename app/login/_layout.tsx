import { Stack } from "expo-router";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import LoginHeader from "../../components/login/header";
import { useReducer, useState } from "react";
import LoginLogin from "../../components/login/login";
import Colors from "../../styles/colors";
import Box from "../../styles/box";
import LoginRegister from "../../components/login/register";
import { useNavigationState } from "@react-navigation/native";

const Login = () => {
    const [menu, setMenu] = useState("login");
    const routes = useNavigationState((state) => state.routes);

    const previousRoute = routes.length > 1 ? routes[routes.length - 2].name : null;

    return (
        <>
            <SafeAreaView style={style.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Stack.Screen
                        options={{
                            title: "Login",
                            headerShown: false,
                            animation: previousRoute === "index" ? "slide_from_bottom" : "slide_from_left"
                        }}
                    />
                    <View style={[Box, style.box]}>
                        <LoginHeader
                            menu={menu}
                            setMenu={setMenu}
                        />
                        {menu == "login" ? (
                            <LoginLogin />
                        ) : (
                            <LoginRegister
                                menu={menu}
                                setMenu={setMenu}
                            />
                        )}
                    </View>
                    <View style={style.footer}>
                        <Image
                            style={style.img1}
                            resizeMode="contain"
                            source={require("./../../assets/img/person.png")}
                        />
                        <Image
                            style={style.img2}
                            resizeMode="contain"
                            source={require("./../../assets/img/sloga.png")}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const style = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        marginTop: 64
    },
    box: {
        width: "95%",
        paddingVertical: 64,
        alignSelf: "center"
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    img1: {
        width: "48%",
        height: 180,
        marginTop: -40
    },
    img2: {
        width: "48%",
        height: 150
    }
});

export default Login;
