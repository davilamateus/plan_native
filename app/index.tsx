import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack, useNavigation } from "expo-router";
import { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import Colors from "../styles/colors";
import { TransitionPresets } from "@react-navigation/stack"; // Para as animações
import { useGetTripApi } from "../requests/trip/useGetTripApi";
import { useGetUserApi } from "../requests/user/useGetUserApi";

const Index = () => {
    const UseGetUserApi = useGetUserApi();
    const UseGetTripApi = useGetTripApi();
    AsyncStorage.getItem("token").then((token) => {
        if (token) {
            UseGetUserApi()
                .then((data) => {
                    console.log("a data ee *****", data);
                    if (data.status !== 200) {
                        router.navigate("/login");
                    } else {
                        router.navigate("/home");
                    }
                })
                .catch(() => {
                    router.navigate("/login");
                });
        } else {
            router.navigate("/login");
        }
    });

    return (
        <View style={style.container}>
            <Image
                resizeMode="contain"
                style={style.loading}
                source={require("./../assets/gifs/btnloadin.gif")}
            />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary
    },

    loading: {
        height: 30
    }
});

export default Index;
