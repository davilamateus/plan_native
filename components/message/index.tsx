import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IMessageActions } from "../../types/IMenssage";
import Colors from "../../styles/colors";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useMessageReducer, useMessageInitialValue } from "../../reducers/useMessageReducer";
import Button from "../global/button";

type IMessage = {
    message: IMessageActions;
};
const Message = ({ message }: IMessage) => {
    const [state, dispatch] = useReducer(useMessageReducer, useMessageInitialValue);
    useEffect(() => {
        if (message.type) {
            dispatch(message);
            setTimeout(() => {
                dispatch({ type: false });
            }, 10000);
        }
    }, [message]);
    const getTypeInformations = (type: string) => {
        switch (type) {
            case "success":
                return { icon: require("./../../assets/icons/message-success.png"), color: Colors.primary };
            case "error":
                return { icon: require("./../../assets/icons/message-error.png"), color: Colors.terciary };
            default:
                return { icon: require("./../../assets/icons/message-atention.png"), color: Colors.quartenary };
        }
    };

    return (
        <Modal
            transparent={true}
            visible={state.status}
            animationType="fade">
            <View style={style.container}>
                {state.status && (
                    <View style={style.box}>
                        <View style={[style.boxImg, { backgroundColor: getTypeInformations(state.type).color }]}>
                            {message.type && <Image source={getTypeInformations(state.type).icon} />}
                        </View>
                        <View style={style.boxText}>
                            <Text style={style.title}>{state.title}</Text>
                            <Text style={style.description}>{state.description}</Text>
                            <Button
                                text={"Ok"}
                                action={() => dispatch({ type: false })}
                                loading={false}
                                status={true}
                                type={""}
                            />
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
};
export default Message;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: Colors.backgroundAlert
    },
    box: {
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginTop: -100
    },

    boxImg: {
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        zIndex: 2
    },
    img: {
        width: 68,
        height: 62,
        zIndex: 3
    },
    boxText: {
        gap: 8,
        maxWidth: 270,
        backgroundColor: Colors.background,
        borderRadius: 8,
        padding: 32,
        marginTop: -34,
        zIndex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    description: {
        textAlign: "center",
        marginBottom: 16
    }
});
