import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack, Tabs } from "expo-router";
import { Button, Text, View } from "react-native";

const Home = () => {
    return (
        <View>
            <Text>Estou na home</Text>
            <Button
                title="Sair"
                onPress={() => {
                    AsyncStorage.clear().then(() => router.push("/login"));
                }}
            />
            <Button
                title="Create Trip"
                onPress={() => {
                    router.push("/createtrip");
                }}
            />
        </View>
    );
};
export default Home;
