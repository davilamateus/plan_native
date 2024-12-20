import { StyleSheet, View, Text, Pressable } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputEmail from "../../global/inputs/email";
import InputPassword from "../../global/inputs/password";
import Button from "../../global/button";
import { IRegister } from "../../../types/ILogin";
import { isEmail } from "../../../functions/isEmail";
import Message from "../../message";
import Colors from "../../../styles/colors";
import InputText from "../../global/inputs/text";
import { isPassword } from "../../../functions/isPassword";
import Paragraph from "../../global/text/paragraph";
import { IMessageActions } from "../../../types/IMenssage";

type props = {
    menu: string;
    setMenu: Dispatch<SetStateAction<string>>;
};

const LoginRegister = ({ menu, setMenu }: props) => {
    const [form, setForm] = useState<IRegister>({ name: "", email: "", password: "", confirmPassword: "" });
    const [btn, setBtn] = useState({ loading: false, active: false });
    const [requirements, setRequirements] = useState({ min: false, upper: false, lower: false, number: false });
    const [message, setMessage] = useState<IMessageActions>({ type: false });
    useEffect(() => {
        setRequirements((prevState) => ({
            ...prevState,
            lower: form.password.search(/[a-z]/) >= 0,
            upper: form.password.search(/[A-Z]/) >= 0,
            number: form.password.search(/[0-9]/) >= 0,
            min: form.password.length >= 8
        }));
    }, [form.password]);
    const handleSubmit = async () => {};
    return (
        <>
            <Message message={message} />

            <View style={style.container}>
                <Paragraph>Enter with your login details."</Paragraph>

                <View style={style.form}>
                    <InputText
                        title="Full Name:"
                        placeholder="Type your full name..."
                        text={form.name}
                        setText={(e) => setForm({ ...form, name: e })}
                    />
                    <InputEmail
                        email={form.email}
                        setEmail={(e) => setForm({ ...form, email: e })}
                    />
                    <View>
                        <InputPassword
                            title="Password:"
                            password={form.password}
                            setPassword={(e) => setForm({ ...form, password: e })}
                        />
                        <View style={style.requirementContainer}>
                            {form.password == "" ||
                            (form.password !== "" &&
                                requirements.number &&
                                requirements.min &&
                                requirements.upper &&
                                requirements.lower) ? (
                                <></>
                            ) : (
                                <>
                                    <View style={style.requirementBox}>
                                        <View style={requirements.lower ? [style.cicle, style.cicleSuccess] : style.cicle}></View>
                                        <Text
                                            style={
                                                requirements.lower
                                                    ? [style.requirement, style.requirementSuccess]
                                                    : style.requirement
                                            }>
                                            Lower
                                        </Text>
                                    </View>
                                    <View style={style.requirementBox}>
                                        <View style={requirements.upper ? [style.cicle, style.cicleSuccess] : style.cicle}></View>
                                        <Text
                                            style={
                                                requirements.upper
                                                    ? [style.requirement, style.requirementSuccess]
                                                    : style.requirement
                                            }>
                                            Upper
                                        </Text>
                                    </View>
                                    <View style={style.requirementBox}>
                                        <View
                                            style={requirements.number ? [style.cicle, style.cicleSuccess] : style.cicle}></View>
                                        <Text
                                            style={
                                                requirements.number
                                                    ? [style.requirement, style.requirementSuccess]
                                                    : style.requirement
                                            }>
                                            Number
                                        </Text>
                                    </View>
                                    <View style={style.requirementBox}>
                                        <View style={requirements.min ? [style.cicle, style.cicleSuccess] : style.cicle}></View>
                                        <Text
                                            style={
                                                requirements.min
                                                    ? [style.requirement, style.requirementSuccess]
                                                    : style.requirement
                                            }>
                                            Min 8 Caracters
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                    <InputPassword
                        title="Confirm Password:"
                        password={form.confirmPassword}
                        setPassword={(e) => setForm({ ...form, confirmPassword: e })}
                    />
                    <View style={style.requirementContainer}>
                        {form.confirmPassword !== "" && form.password !== form.confirmPassword && (
                            <View style={style.requirementBox}>
                                <View style={requirements.lower ? [style.cicle, style.cicleSuccess] : style.cicle}></View>
                                <Text
                                    style={
                                        requirements.lower ? [style.requirement, style.requirementSuccess] : style.requirement
                                    }>
                                    Passwords must be the same.
                                </Text>
                            </View>
                        )}
                    </View>
                    <Button
                        text="Create account"
                        action={handleSubmit}
                        loading={btn.loading}
                        status={
                            form.name !== "" &&
                            isEmail(form.email) &&
                            isPassword(form.password) &&
                            form.password === form.confirmPassword
                        }
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

export default LoginRegister;

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
    },
    requirementContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8
    },
    requirementBox: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },
    requirement: {
        color: Colors.paragraph,
        fontSize: 12
    },
    requirementSuccess: {
        color: Colors.primary
    },
    cicle: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: Colors.lightBorder
    },
    cicleSuccess: {
        backgroundColor: Colors.primary
    }
});
