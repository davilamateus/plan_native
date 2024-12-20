import { StyleSheet, Text } from "react-native";
import React from "react";
import Colors from "../../../../styles/colors";

type props = {
    children: React.ReactNode;
};

const Paragraph = ({ children }: props) => {
    return <Text style={style.paragraph}>{children}</Text>;
};

export default Paragraph;

const style = StyleSheet.create({
    paragraph: {
        color: Colors.paragraph
    }
});
