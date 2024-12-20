import { useNavigationState } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { UseUserContextProvider } from "../context/useUserContext";

const Router = () => {
    const routes = useNavigationState((state) => state.routes);

    const previousRoute = routes.length > 1 ? routes[routes.length - 2].name : null;

    return (
        <UseUserContextProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        animation: previousRoute === "index" ? "fade" : "slide_from_right"
                    }}
                />
            </Stack>
        </UseUserContextProvider>
    );
};

export default Router;

const style = StyleSheet.create({
    container: {}
});
