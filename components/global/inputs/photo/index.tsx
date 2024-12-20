import { Camera, CameraType } from "expo-camera/legacy";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Dimensions, Image, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Colors from "../../../../styles/colors";
import * as ImagePicker from "expo-image-picker";
import { UseUserContext } from "../../../../context/useUserContext";
import { BASE_URL } from "../../../../axios";
import { userUploadPhoto } from "../../../../requests/user/useUploadPhoto";

export default function InputPhoto() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const camRef = useRef<Camera | null>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [image, setImage] = useState(require("./../../../../assets/img/photodefault.png"));
    const [opened, setOpened] = useState(false);

    const user = useContext(UseUserContext);

    useEffect(() => {
        if (user?.state?.photo) {
            setImage({ uri: `${BASE_URL}imagens/user/${user.state.photo}` });
        }
    }, [user]);

    const screenWidth = Dimensions.get("window").width;
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>We need your permission to show the camera</Text>
                <Button
                    onPress={requestPermission}
                    title="grant permission"
                />
            </View>
        );
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setImage({ uri: result.assets[0].uri });
            setOpened(false);
        }
    };

    async function takePicture() {
        if (camRef.current) {
            const photo = await camRef.current.takePictureAsync();
            setImage({ uri: photo.uri });
            console.log(photo.uri);
            const response = await userUploadPhoto(photo.uri);

            setOpened(false);
        }
    }

    function toggleCameraType() {
        setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setOpened(true)}>
                <Image
                    style={styles.img}
                    source={image}
                />
            </Pressable>
            {opened && (
                <Modal>
                    <Camera
                        ref={camRef}
                        style={styles.camera}
                        type={type}>
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonsTop}></View>
                            <View style={{ ...styles.grade, width: screenWidth, height: screenWidth }}></View>
                            <View style={styles.buttonsBottom}>
                                <Pressable
                                    style={styles.button}
                                    onPress={pickImage}>
                                    <Image
                                        resizeMode="contain"
                                        style={styles.icon}
                                        source={require("./../../../../assets/icons/galery.png")}
                                    />
                                </Pressable>
                                <Pressable
                                    style={styles.capture}
                                    onPress={takePicture}></Pressable>
                                <Pressable
                                    style={styles.button}
                                    onPress={toggleCameraType}>
                                    <Image
                                        resizeMode="contain"
                                        style={styles.icon}
                                        source={require("./../../../../assets/icons/flip.png")}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </Camera>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: "center"
    },
    icon: {
        width: 32,
        height: 32
    },
    capture: {
        width: 58,
        height: 58,
        backgroundColor: "#fff",
        borderRadius: 52,
        alignSelf: "flex-end",
        alignItems: "center"
    },
    container: {
        justifyContent: "center"
    },
    camera: {
        flex: 1
    },
    buttonsTop: {
        flex: 1
    },
    grade: {
        alignSelf: "center",
        borderRadius: 3000,
        borderWidth: 5,
        borderColor: Colors.primary
    },

    buttonsBottom: {
        flex: 1,
        flexDirection: "row",
        paddingBottom: 30,
        paddingHorizontal: 32,
        opacity: 0.5,
        justifyContent: "space-between"
    },

    buttonContainer: {
        flex: 1,
        flexDirection: "column",
        width: "100%"
    },
    button: {
        alignSelf: "flex-end",
        alignItems: "center"
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white"
    }
});
