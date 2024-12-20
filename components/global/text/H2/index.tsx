import { StyleSheet, Text } from "react-native";
import Colors from "../../../../styles/colors";

type props = {
    children: React.ReactNode;
};
const H2 = ({ children }: props) => {
    return <Text style={style.h2}>{children}</Text>;
};

export default H2;

const style = StyleSheet.create({
    h2: {
        color: Colors.title,
        fontSize: 26,
        fontWeight: "bold"
    }
});
