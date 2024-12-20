import { StyleSheet, Text } from "react-native";
import Colors from "../../../../styles/colors";

type props = {
    children: React.ReactNode;
};
const H1 = ({ children }: props) => {
    return <Text style={style.h3}>{children}</Text>;
};

export default H1;

const style = StyleSheet.create({
    h3: {
        color: Colors.title,
        fontSize: 32,
        fontWeight: "bold"
    }
});
