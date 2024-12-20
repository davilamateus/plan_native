import { StyleSheet, Text } from "react-native";
import Colors from "../../../../styles/colors";

type props = {
    children: React.ReactNode;
};
const H4 = ({ children }: props) => {
    return <Text style={style.h4}>{children}</Text>;
};

export default H4;

const style = StyleSheet.create({
    h4: {
        color: Colors.title,
        fontSize: 14,
        fontWeight: "bold"
    }
});
