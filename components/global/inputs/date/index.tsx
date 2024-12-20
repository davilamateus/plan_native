import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../../styles/colors";
import H4 from "../../text/H4";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Paragraph from "../../text/paragraph";

type Props = {
    title: string;
    setDate: (e: number) => void;
};

const InputDate: React.FC<Props> = ({ title, setDate }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [opened, setOpened] = useState(false);

    const handleConfirm = (date: Date) => {
        console.log(new Date(date).getTime());
        setSelectedDate(date);
        setOpened(false);
        setDate(Number(new Date(date).getTime().toFixed()));
    };

    return (
        <Pressable
            onPress={() => setOpened(true)}
            style={style.box}>
            <H4>{title}</H4>
            <View style={style.input}>
                <Text>{selectedDate.toLocaleDateString()}</Text>
            </View>
            <DateTimePickerModal
                date={selectedDate}
                isVisible={opened}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setOpened(false)}
            />
        </Pressable>
    );
};

export default InputDate;

const style = StyleSheet.create({
    box: {
        gap: 8
    },
    input: {
        fontSize: 12,
        width: "100%",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderColor: Colors.border
    }
});
