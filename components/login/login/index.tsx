import { StyleSheet, View, Text, Pressable } from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import TextComponent from "../../global/text/paragraph";
import InputEmail from "../../global/inputs/email";
import InputPassword from "../../global/inputs/password";
import Remember from "../remember";
import Button from "../../global/button";
import { useLoginApi } from "../../../requests/login/useLogin";
import { ILogin } from "../../../types/ILogin";
import { isEmail } from "../../../functions/isEmail";
import Message from "../../message";
import { IMessageActions } from "../../../types/IMenssage";
import { router } from "expo-router";
import Colors from "../../../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Paragraph from "../../global/text/paragraph";

const LoginLogin = () => {
    const [form, setForm] = useState<ILogin>({ email: "", password: "", remember: false });
    const [btn, setBtn] = useState({ loading: false, active: false });
    const [message, setMessage] = useState<IMessageActions>({ type: false });
    const UseLoginApi = useLoginApi();

    const handleSubmit = async () => {
        try {
            setBtn((prev) => ({ ...prev, loading: true }));
            const data = await UseLoginApi(form);
            console.log("tentandooo", data);

            if (data.status === 200) {
                if (form.remember) {
                    AsyncStorage.setItem("token", data.data.result).then(() => {
                        router.navigate("/home");
                    });
                } else {
                    router.navigate("/home");
                }
            } else if (data.status === 201) {
                AsyncStorage.setItem("token", data.data.result).then(() => {
                    router.push("/createtrip");
                });
            } else if (data.status === 203) {
                setMessage({ type: "login_error_unconfirm" });
            } else {
                setMessage({ type: "login_error_wrong" });
            }
        } catch (error) {
            setMessage({ type: "server_error" });
        } finally {
            setBtn((prev) => ({ ...prev, loading: false }));
        }
    };
    return (
        <>
            <Message message={message} />

            <View style={style.container}>
                <Paragraph>Enter with your login details.</Paragraph>
                <View style={style.form}>
                    <InputEmail
                        email={form.email}
                        setEmail={(e) => setForm({ ...form, email: e })}
                    />
                    <InputPassword
                        title="Password:"
                        password={form.password}
                        setPassword={(e) => setForm({ ...form, password: e })}
                    />
                    <Remember
                        remember={form.remember}
                        setRemember={(e) => setForm({ ...form, remember: e })}
                    />
                    <Button
                        text="Login"
                        action={handleSubmit}
                        loading={btn.loading}
                        status={isEmail(form.email) && form.password !== ""}
                        type={"success"}
                    />
                    <Pressable style={style.forgetBtn}>
                        <Text style={style.forgetText}>Do you forget your password?</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default LoginLogin;

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 32
    },
    form: {
        width: "100%",
        maxWidth: 300,
        gap: 24
    },
    forgetBtn: {
        marginTop: 24,
        borderWidth: 1.5,
        borderColor: Colors.secondary,
        width: 248,
        height: 32,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 16,
        opacity: 0.7
    },
    forgetText: {
        color: Colors.secondary,
        fontSize: 14
    }
});
