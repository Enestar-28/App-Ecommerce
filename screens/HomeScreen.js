import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    Image,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";

const HomeScreen = () => {

    const images = [
        "https://cf.shopee.vn/file/vn-50009109-5c7401da968876420e2099196c34b4ab",
        "https://down-vn.img.susercontent.com/file/vn-50009109-a60d23097516aa9ebf9ef8faca307815",
        "https://cf.shopee.vn/file/856d76a2fb06e2fbf00a82d2e37151d9",
    ];
    const deals = [
        {
            id: "20",
            title: "Apple iPad Air (Gen 5) WIFI Chính hãng (ZA/A)",
            oldPrice: 25000,
            price: 19000,
            image:
                "https://down-vn.img.susercontent.com/file/c27aabca2993e4c8c1d7c0072adef63e",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/c27aabca2993e4c8c1d7c0072adef63e",
            ],
            color: "Trắng",
            size: "M L XL XXL",
        },
        {
            id: "30",
            title:
                "Apple Watch Ultra viền Titanium dây Trail Loop size S/M 49mm Chính hãng",
            oldPrice: 74000,
            price: 26000,
            image:
                "https://down-vn.img.susercontent.com/file/sg-11134201-23020-7gat67ac6gnv79",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/sg-11134201-23020-7gat67ac6gnv79",
                "https://down-vn.img.susercontent.com/file/sg-11134201-23020-q9gsp8ac6gnva5",
                "https://down-vn.img.susercontent.com/file/sg-11134201-23020-iq4tl7ac6gnvf8",
                "https://down-vn.img.susercontent.com/file/sg-11134201-23020-6swu26ac6gnvb7"
            ],
            color: "TiTain - Tự Nhiên",
            size: "8 GB RAM 128GB Storage",
        },
        {
            id: "40",
            title:
                "Tai nghe Bluetooth Apple AirPods Pro (Gen 2) Chính hãng VN/A",
            oldPrice: 16000,
            price: 14000,
            "image": "https://down-vn.img.susercontent.com/file/sg-11134201-22110-c4pqgt989djvd7",
            "carouselImages": [
                "https://down-vn.img.susercontent.com/file/sg-11134201-22110-f3rmnfmqjfjv6f",
                "https://down-vn.img.susercontent.com/file/sg-11134201-22110-9m6jhgmqjfjv09",
                "https://down-vn.img.susercontent.com/file/sg-11134201-22110-mclmtemqjfjv7b",
                "https://down-vn.img.susercontent.com/file/sg-11134201-22110-5kak1t989djvef"
            ],
            color: "Icy Silver",
            size: "6 GB RAM 64GB Storage",
        },
        {
            id: "40",
            title:
                "Xe Máy Honda Vision 2023 - Phiên Bản Thể Thao",
            oldPrice: 12999,
            price: 10999,
            image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltkmrv1ny0ay96",
            carouselImages: [
                "https://down-vn.img.susercontent.com/file/sg-11134201-22120-5c9w3f5qjtkv0e",
                "https://down-vn.img.susercontent.com/file/sg-11134201-22120-7otxmg5qjtkvec",
                "https://down-vn.img.susercontent.com/file/sg-11134201-22120-9a9xcg5qjtkve0",
                "https://down-vn.img.susercontent.com/file/sg-11134201-22120-ubnelikrjtkvac"
            ],
        },
    ];

    const [products, setProducts] = useState([]);
    const [categoies, setCategoies] = useState([]);
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [category, setCategory] = useState("Nam");
    // const { userId, setUserId } = useContext(UserType);
    const [selectedAddress, setSelectedAdress] = useState("");

    const [items, setItems] = useState([
        { label: "Điện tử", value: "Điện tử" },
        { label: "Nam", value: "Nam" },
        { label: "Nữ", value: "Nữ" },
        { label: "Đồng hồ", value: "Đồng hồ" },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.1.42:3333/api/v0/getproducts");
                setProducts(response.data.result);

            } catch (error) {
                console.log("error message", error);
            }
        };
        const categoiesData = async () => {
            try {
                const response = await axios.get("http://192.168.1.42:3333/api/v0/getcategoris");
                setCategoies(response.data.result);
            } catch (error) {
                console.log("error message", error);
            }
        };
        categoiesData();
        fetchData();
    }, []);
    const onGenderOpen = useCallback(() => {
        setCompanyOpen(false);
    }, []);

    const cart = useSelector((state) => state.cart.cart);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <SafeAreaView
                style={{ marginTop: 50, backgroundColor: "#fff" }}
                showsVerticalScrollIndicator={false}
            >
                <ScrollView>
                    <View
                        style={{
                            backgroundColor: "#F6412E",
                            padding: 10,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginHorizontal: 7,
                                gap: 10,
                                backgroundColor: "white",
                                borderRadius: 3,
                                height: 38,
                                flex: 1,
                            }}
                        >
                            <AntDesign
                                style={{ paddingLeft: 10 }}
                                name="search1"
                                size={22}
                                color="black"
                            />
                            <TextInput placeholder="Tìm kiếm" />
                        </Pressable>

                        <Feather name="mic" size={24} color="black" />
                    </View>

                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            padding: 10,
                            backgroundColor: "#FF6433",
                        }}
                    >
                        <Ionicons name="location-outline" size={24} color="black" />

                        <Pressable>
                            {selectedAddress ? (
                                <Text>
                                    Giao Đến Địa chỉ này
                                </Text>
                            ) : (
                                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                                    Vận chuyển đến Đại Học Xây Dựng, ...
                                </Text>
                            )}
                        </Pressable>

                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    </Pressable>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categoies.map((item, index) => {

                            return (
                                <Pressable
                                    key={index}
                                    style={{
                                        margin: 10,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        style={{ width: 50, height: 50, resizeMode: "contain" }}
                                        source={{ uri: item.image }}
                                    />

                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontSize: 12,
                                            fontWeight: "500",
                                            marginTop: 5,
                                        }}
                                    >
                                        {item?.name}
                                    </Text>
                                </Pressable>
                            );
                        })}

                    </ScrollView>

                    <SliderBox
                        images={images}
                        autoPlay
                        circleLoop
                        dotColor={"#13274F"}
                        inactiveDotColor="#90A4AE"
                        ImageComponentStyle={{ width: "100%" }}
                    />

                    <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
                        Đơn hàng bán chạy trong tuần
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {deals.map((item, index) => (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("Info", {
                                        id: item.id,
                                        title: item.title,
                                        price: item?.price,
                                        carouselImages: item.carouselImages,
                                        color: item?.color,
                                        size: item?.size,
                                        oldPrice: item?.oldPrice,
                                        item: item,
                                    })
                                }
                                style={{
                                    marginVertical: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    style={{ width: 180, height: 180, resizeMode: "contain" }}
                                    source={{ uri: item?.image }}
                                />
                            </Pressable>
                        ))}
                    </View>

                    <Text
                        style={{
                            height: 1,
                            borderColor: "#D0D0D0",
                            borderWidth: 2,
                            marginTop: 15,
                        }}
                    />

                    <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
                        Ưu đãi hấp dẫn
                    </Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {products.map((item, index) => (
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("Info", {
                                        id: item.id,
                                        title: item.title,
                                        price: item?.price,
                                        carouselImages: item.carouselImages,
                                        color: item?.color,
                                        size: item?.size,
                                        oldPrice: item?.oldPrice,
                                        item: item,
                                    })
                                }
                                style={{
                                    marginVertical: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                                    source={{ uri: item?.image }}
                                />

                                <View
                                    style={{
                                        backgroundColor: "#E31837",
                                        paddingVertical: 5,
                                        width: 130,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 10,
                                        borderRadius: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "white",
                                            fontSize: 13,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Giảm tới 70%
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>

                    <Text
                        style={{
                            height: 1,
                            borderColor: "#D0D0D0",
                            borderWidth: 2,
                            marginTop: 15,
                        }}
                    />

                    <View
                        style={{
                            marginHorizontal: 10,
                            marginTop: 20,
                            width: "45%",
                            marginBottom: open ? 50 : 15,
                        }}
                    >
                        <DropDownPicker
                            style={{
                                borderColor: "#B7B7B7",
                                height: 30,
                                marginBottom: open ? 120 : 15,
                            }}
                            open={open}
                            value={category} //genderValue
                            items={items}
                            setOpen={setOpen}
                            setValue={setCategory}
                            setItems={setItems}
                            placeholder="choose category"
                            placeholderStyle={styles.placeholderStyles}
                            onOpen={onGenderOpen}
                            // onChangeValue={onChange}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {products?.map((item, index) => (
                            <ProductItem
                                item={item}
                                key={index}
                                onPress={() =>
                                    navigation.navigate("Info", {
                                        id: item._id,
                                        title: item.title,
                                        carouselImages: item.carouselImages,
                                        color: item?.color,
                                        size: item?.size,
                                    })
                                }
                            />
                        ))}


                    </View>
                </ScrollView>
            </SafeAreaView>

            <BottomModal
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: "bottom",
                    })
                }
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}
            >
                <ModalContent style={{ width: "100%", height: 400 }}>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>
                            Chọn địa chỉ giao hàng
                        </Text>

                        <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
                            Chọn địa chỉ giao hàng hoặc thêm địa chỉ mới
                        </Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {/* already added addresses */}

                        <Pressable
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("Address");
                            }}
                            style={{
                                width: 140,
                                height: 140,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                padding: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 3,
                                marginRight: 15,
                                marginTop: 10,
                                // backgroundColor: selectedAddress === item ? "#FBCEB1" : "white"
                            }}
                        >

                            <Text style={{ fontSize: 16, fontWeight: "500" }}> Thêm địa chỉ mới</Text>
                        </Pressable>
                    </ScrollView>
                    <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
                        <View
                            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                        >
                            <Entypo name="location-pin" size={22} color="#0066b2" />
                            <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                                Sử dụng địa chỉ mặc định
                            </Text>
                        </View>

                        <View
                            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                        >
                            <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                            <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                                Sử dụng vị trí hiện tại
                            </Text>
                        </View>

                        <View
                            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                        >
                            <AntDesign name="earth" size={22} color="#0066b2" />

                            <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                                Giao hàng đến quốc gia khác
                            </Text>
                        </View>
                    </View>




                </ModalContent>
            </BottomModal>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
