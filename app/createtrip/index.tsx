import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, Image, View } from "react-native";
import { ITrip } from "../../types/ITrip";
import { useCreateTripDetails } from "../../requests/trip/useCreateTripDetails";
import { router } from "expo-router";
import H2 from "../../components/global/text/H2";
import Paragraph from "../../components/global/text/paragraph";
import InputCity from "../../components/global/inputs/city";
import { getCurrency } from "../../functions/cities/getCurrency";
import InputPhoto from "../../components/global/inputs/photo";
import Colors from "../../styles/colors";
import Box from "../../styles/box";
import InputDate from "../../components/global/inputs/date";
import Button from "../../components/global/button";

const CreateTrip = () => {
    const [trip, setTrip] = useState<ITrip>({
        currentCity: "",
        currentState: "",
        currentCountry: "",
        currentCountrySlug: "",
        currentCurrency: "",

        tripCity: "",
        tripState: "",
        tripCountry: "",
        tripCountrySlug: "",
        tripCurrency: "",
        tripLon: "",
        tripLat: "",
        when: new Date().getTime() + 31536000000,
        loaded: false
    });
    const UseCreateTripDetails = useCreateTripDetails();
    const [btnLoading, setBtnLoading] = useState(false);
    const [selected, setSelected] = useState(false);

    const handleSubmit = () => {
        setBtnLoading(true);
        UseCreateTripDetails(trip).then((data: any) => {
            if (data.status == 200) {
                router.navigate(`/home`);
            } else {
                //router.navigate("/login");
            }
        });
    };

    return (
        <View style={style.main}>
            <View style={[style.container, Box]}>
                <View style={style.header}>
                    <H2>User Details</H2>
                    <Paragraph>Now we need some informations about you and yours plans of trip.</Paragraph>
                    <InputPhoto />
                </View>
                <View style={style.form}>
                    <InputCity
                        title="Where are you from?"
                        inicialValue=""
                        result={(e) =>
                            setTrip({
                                ...trip,
                                currentCity: e.address.name,
                                currentState: e.address.state,
                                currentCountry: e.address.country,
                                currentCountrySlug: e.address.country_code,
                                currentCurrency: getCurrency(e.address.country)
                            })
                        }
                    />
                    <InputCity
                        title="Where do intend to go trip?"
                        result={(e) => {
                            setTrip({
                                ...trip,
                                tripCity: e.address.name,
                                tripState: e.address.state,
                                tripCountry: e.address.country,
                                tripCountrySlug: e.address.country_code,
                                tripCurrency: getCurrency(e.address.country),
                                tripLat: e.lat,
                                tripLon: e.lon
                            });
                        }}
                    />
                    <InputDate
                        title="When do you intend to go?"
                        setDate={(date) => setTrip({ ...trip, when: date })}
                    />
                    <Button
                        text="Save"
                        action={handleSubmit}
                        loading={trip.loaded}
                        status={trip.currentCity !== "" && trip.tripCity !== ""}
                        type={"success"}
                    />
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        alignItems: "center",
        gap: 16
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 32,
        paddingVertical: 64,
        gap: 32,
        width: "95%"
    },
    form: {
        width: "100%",
        gap: 16,
        maxWidth: 300
    },
    img: {
        height: 200
    }
});

export default CreateTrip;
