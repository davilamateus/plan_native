import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Tabs } from "expo-router";
import { Button, Image, SafeAreaView, StyleSheet } from "react-native";
import Colors from "../../styles/colors";

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveBackgroundColor: Colors.primary,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarItemStyle: {
                    flex: 1,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                    marginHorizontal: 8
                },
                tabBarIconStyle: { opacity: 0.4 }
            }}>
            <Tabs.Screen
                name={"home"}
                options={{
                    tabBarIcon: () => (
                        <Image
                            resizeMode="contain"
                            style={style.img}
                            source={require("./../../assets/icons/home.png")}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name={"noticies"}
                options={{
                    tabBarIcon: () => (
                        <Image
                            resizeMode="contain"
                            style={style.img}
                            source={require("./../../assets/icons/noticies.png")}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name={"advices"}
                options={{
                    tabBarIcon: () => (
                        <Image
                            resizeMode="contain"
                            style={style.img}
                            source={require("./../../assets/icons/advices.png")}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name={"todolist"}
                options={{
                    tabBarIcon: () => (
                        <Image
                            resizeMode="contain"
                            style={style.img}
                            source={require("./../../assets/icons/todolist.png")}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name={"finances"}
                options={{
                    tabBarIcon: () => (
                        <Image
                            resizeMode="contain"
                            style={style.img}
                            source={require("./../../assets/icons/finances.png")}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name={"exchange"}
                options={{
                    tabBarIcon: () => (
                        <Image
                            resizeMode="contain"
                            style={style.img}
                            source={require("./../../assets/icons/exchange.png")}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name={"myaccount"}
                options={{
                    tabBarIcon: () => (
                        <Image
                            resizeMode="contain"
                            style={style.img}
                            source={require("./../../assets/icons/myaccount.png")}
                        />
                    )
                }}
            />
        </Tabs>
    );
};
export default TabsLayout;

const style = StyleSheet.create({
    img: {
        width: 20,
        maxHeight: 20
    }
});
