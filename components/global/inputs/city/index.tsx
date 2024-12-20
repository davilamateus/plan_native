import { useEffect, useState } from "react";
import { useGetCityAutocomplete } from "../../../../requests/useCityRequest";
import { ILocation } from "../../../../types/ICity";
import { FlatList, TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import H4 from "../../text/H4";
import Colors from "../../../../styles/colors";

interface Types {
    title: string;
    inicialValue?: string;
    result: (e: ILocation) => void;
}
const InputCity = ({ title, inicialValue, result }: Types) => {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<ILocation[]>([]);
    const [selected, setSelected] = useState(false);

    const UseGetTripAutocomplete = useGetCityAutocomplete();

    const handleSubmit = () => {
        UseGetTripAutocomplete(query).then((data: any) => {
            if (!data) {
                return;
            }
            if (data.status === 200) {
                setSuggestions(data.data);
            } else {
                handleSubmit();
            }
        });
    };

    useEffect(() => {
        if (query.length > 3) handleSubmit();
    }, [query]);

    const handleInputChange = (text: string) => {
        setQuery(text);
    };

    const handleSelectLocation = (location: ILocation) => {
        setSelected(true);
        setQuery(
            location.address.name +
                (location.address.state ? " - " + location.address.state : "") +
                " - " +
                location.address.country
        );
        result(location);
        setSuggestions([]);
    };

    return (
        <View>
            <View style={style.box}>
                <H4>{title}</H4>
                <TextInput
                    style={style.input}
                    placeholder={inicialValue || "Type a city..."}
                    value={query}
                    onChangeText={(e) => {
                        setSelected(false);
                        setQuery(e);
                    }}
                    onKeyPress={(e) => {
                        handleInputChange(query);
                    }}
                />
                {suggestions.length > 0 && !selected && (
                    <View>
                        <FlatList
                            data={suggestions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelectLocation(item)}>
                                    <Text>
                                        {item.address.name}
                                        {item.address.state ? ` - ${item.address.state} ` : " "}- {item.address.country}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default InputCity;
const style = StyleSheet.create({
    box: {
        gap: 8
    },
    input: {
        width: "100%",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderColor: Colors.border
    }
});
