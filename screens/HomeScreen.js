import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    Image, FlatList, ActivityIndicator
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchProductsRequest } from "../redux/product/ProductActions.js";
import { fetchCategoriesRequest } from "../redux/categories/CategoriesActions.js";
import { fetchUserRequest } from "../redux/user/UserActions.js";
import { UserType } from "../UserContext";
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

    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType);
    const [selectedAddress, setSelectedAdress] = useState("");
    const [category, setCategory] = useState("Nam");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [isEndReachedCalled, setIsEndReachedCalled] = useState(false);
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = await AsyncStorage.getItem("UserId");
            setUserId(userId);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        // Gọi action fetchCategories để lấy danh sách các danh mục
        dispatch(fetchCategoriesRequest());

        // Gọi action fetchProducts để lấy danh sách sản phẩm
        fetchProducts();

    }, [dispatch]);




    const fetchProducts = (loadMore = false) => {
        dispatch(fetchProductsRequest({ page: currentPage, size: pageSize, loadMore: loadMore }));
    };



    const handleEndReached = () => {
        // Nếu hàm đã được gọi và đang chờ 2 giây, không gọi lại
        if (isEndReachedCalled) return
        setIsEndReachedCalled(true); // Đánh dấu là hàm đã được gọi
        setTimeout(() => {
            handleLoadMore(); // Gọi hàm handleLoadMore sau 2 giây
            setIsEndReachedCalled(false); // Đặt lại biến đếm sau khi đã gọi hàm
        }, 1000); // Thời gian chờ 2 giây
    };
    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
        console.log("currentPage", currentPage);
        fetchProducts(true);
    };

    const onGenderOpen = useCallback(() => {
        setCompanyOpen(false);
    }, []);

    // const cart = useSelector((state) => state.cart.cart);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserRequest(userId))
            setAddresses(user?.addresses);
        }
    }, [userId, modalVisible, dispatch]);
    const renderFooter = () => {
        return (
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <ActivityIndicator size="large" color="#888888" />
            </View>
        );
    };


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
                                    Giao tới {selectedAddress?.name} - {selectedAddress?.street}
                                </Text>
                            ) : (
                                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                                    Thêm địa chỉ giao hàng
                                </Text>
                            )}
                        </Pressable>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    </Pressable>


                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categories.map((item, index) => (
                            <Pressable
                                key={index}
                                onPress={() => navigation.navigate('ListProduct', { categoryId: item._id })}
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
                        ))}
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

                    </View>

                    <FlatList
                        data={products}
                        renderItem={({ item, index }) => (
                            <Pressable
                                key={index}
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
                                    margin: 10,
                                    width: "45%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ProductItem item={item} />
                            </Pressable>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2} // Hiển thị 2 cột
                        onEndReached={handleEndReached} // Gọi hàm khi cuộn đến cuối danh sách
                        onEndReachedThreshold={0.1} // Khoảng cách từ cuối danh sách để gọi hàm
                        ListFooterComponent={renderFooter && renderFooter()} // Render phần tử footer
                    />
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
                        {addresses?.map((item, index) => (
                            <Pressable
                                onPress={() => setSelectedAdress(item)}
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
                                    backgroundColor: selectedAddress === item ? "#FBCEB1" : "white"
                                }}
                            >
                                <View
                                    style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                                >
                                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                                        {item?.name}
                                    </Text>
                                    <Entypo name="location-pin" size={24} color="red" />
                                </View>

                                <Text
                                    numberOfLines={1}
                                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                                >
                                    {item?.houseNo},{item?.landmark}
                                </Text>

                                <Text
                                    numberOfLines={1}
                                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                                >
                                    {item?.street}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                                >
                                    {item?.city} - {item?.country}
                                </Text>
                            </Pressable>
                        ))}

                        <Pressable
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("Address");
                            }}
                            style={{
                                width: 140,
                                height: 140,
                                borderColor: "#D0D0D0",
                                marginTop: 10,
                                borderWidth: 1,
                                padding: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#0066b2",
                                    fontWeight: "500",
                                }}
                            >
                                Thêm địa chỉ mới
                            </Text>
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

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    loadMoreButton: {
        marginHorizontal: 20,
        backgroundColor: "white",
        paddingVertical: 15, // Điều chỉnh độ cao của nút
        paddingHorizontal: 30, // Điều chỉnh độ rộng của nút
        borderRadius: 8, // Điều chỉnh độ cong của góc
        borderWidth: 2, // Thêm viền
        borderColor: "#ccc", // Màu viền
    },
    loadMoreButtonText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18, // Điều chỉnh kích thước chữ
    },
});

