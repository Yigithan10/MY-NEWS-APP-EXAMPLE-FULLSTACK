import React, { useEffect, useState, useCallback, createRef } from 'react';
import Languages from '../../languages.json';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    RefreshControl,
    TextInput,
    Keyboard,
    PermissionsAndroid
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Avatar, Box, Icon, Menu, WarningIcon, CheckCircleIcon, useToast, Center, FormControl, Select, CheckIcon, Actionsheet, useDisclose } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import { SetImagePath, SetIsComment } from '../redux/action';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {

    const { MyStore } = useSelector(state => state);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const [photo, setPhoto] = useState(null);

    let txtCategory1 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory1;
    let txtCategory2 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory2;
    let txtCategory3 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory3;
    let txtCategory4 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory4;
    let txtCategory5 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory5;
    let txtCategory6 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory6;

    let txtProfileOptions = Languages.languages[MyStore.languageRedux].Profile.txtProfileOptions;
    let txtSettings = Languages.languages[MyStore.languageRedux].Profile.txtSettings;
    let txtSaves = Languages.languages[MyStore.languageRedux].Profile.txtSaves;
    let txtLogOut = Languages.languages[MyStore.languageRedux].Profile.txtLogOut;
    let txtCancel = Languages.languages[MyStore.languageRedux].Profile.txtCancel;
    let txtNewsOptions = Languages.languages[MyStore.languageRedux].Profile.txtNewsOptions;
    let txtNewsOptionsEdit = Languages.languages[MyStore.languageRedux].Profile.txtNewsOptionsEdit;
    let txtNewsOptionsDelete = Languages.languages[MyStore.languageRedux].Profile.txtNewsOptionsDelete;
    let txtNewsOptionsAlertAsk = Languages.languages[MyStore.languageRedux].Profile.txtNewsOptionsAlertAsk;
    let txtNewsOptionsAlertText = Languages.languages[MyStore.languageRedux].Profile.txtNewsOptionsAlertText;
    let txtNewsOptionsAlertNo = Languages.languages[MyStore.languageRedux].Profile.txtNewsOptionsAlertNo;
    let txtNewsOptionsAlertYes = Languages.languages[MyStore.languageRedux].Profile.txtNewsOptionsAlertYes;
    let txtLogOutAlertAsk = Languages.languages[MyStore.languageRedux].Profile.txtLogOutAlertAsk;
    let txtLogOutAlertText = Languages.languages[MyStore.languageRedux].Profile.txtLogOutAlertText;
    let txtLogOutAlertNo = Languages.languages[MyStore.languageRedux].Profile.txtLogOutAlertNo;
    let txtLogOutAlertYes = Languages.languages[MyStore.languageRedux].Profile.txtLogOutAlertYes;
    let txtNewsUpdateHeader = Languages.languages[MyStore.languageRedux].Profile.txtNewsUpdateHeader;
    let txtNewsUpdateTitle = Languages.languages[MyStore.languageRedux].Profile.txtNewsUpdateTitle;
    let txtNewsUpdateText = Languages.languages[MyStore.languageRedux].Profile.txtNewsUpdateText;
    let txtNewsUpdateTitleNot = Languages.languages[MyStore.languageRedux].Profile.txtNewsUpdateTitleNot;
    let txtNewsUpdateTextNot = Languages.languages[MyStore.languageRedux].Profile.txtNewsUpdateTextNot;
    let txtNewsUpdateOkAlert = Languages.languages[MyStore.languageRedux].Profile.txtNewsUpdateOkAlert;
    let txtNewsUpdateNoAlert = Languages.languages[MyStore.languageRedux].Profile.txtNewsUpdateNoAlert;
    let txtNewsDeleteOkAlert = Languages.languages[MyStore.languageRedux].Profile.txtNewsDeleteOkAlert;
    let txtNotFoundNews = Languages.languages[MyStore.languageRedux].Profile.txtNotFoundNews;

    let txtPhotoTitle = Languages.languages[MyStore.languageRedux].Profile.txtPhotoTitle;
    let txtPhotoCamera = Languages.languages[MyStore.languageRedux].Profile.txtPhotoCamera;
    let txtPhotoPhotos = Languages.languages[MyStore.languageRedux].Profile.txtPhotoPhotos;
    let txtPhotoNoPhoto = Languages.languages[MyStore.languageRedux].Profile.txtPhotoNoPhoto;
    let txtPhotoAlertUpOk = Languages.languages[MyStore.languageRedux].Profile.txtPhotoAlertUpOk;
    let txtPhotoAlertUpNo = Languages.languages[MyStore.languageRedux].Profile.txtPhotoAlertUpNo;
    let txtPhotoAlertNo = Languages.languages[MyStore.languageRedux].Profile.txtPhotoAlertNo;
    let txtPhotoAlertDeleteOk = Languages.languages[MyStore.languageRedux].Profile.txtPhotoAlertDeleteOk;
    let txtPhotoAlertDeleteIs = Languages.languages[MyStore.languageRedux].Profile.txtPhotoAlertDeleteIs;

    const [isProfileMenu, setIsProfileMenu] = useState(false);
    const [isProfileMenuPhoto, setIsProfileMenuPhoto] = useState(false);

    const [myNews, setMyNews] = useState([]);
    const [isSpinner, setIsSpinner] = useState(false);

    const [isLikedButton, setIsLikedButton] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);
    const [newsId, setNewsId] = useState('');
    const [newsUsername, setNewsUsername] = useState('');
    const [newsTitle, setNewsTitle] = useState('');
    const [newsText, setNewsText] = useState('');
    const [newsCategoryId, setNewsCategoryId] = useState(1);
    const [newsLikes, setNewsLikes] = useState(1);
    const [newsLikesUsers, setNewsLikesUsers] = useState(1);
    const [newsComments, setNewsComments] = useState(1);
    const [newsTime, setNewsTime] = useState(1);
    const [newsDate, setNewsDate] = useState(1);

    const [newsUpdateCategory, setNewsUpdateCategory] = useState(1);
    const [newsUpdateTitle, setNewsUpdateTitle] = useState('');
    const [newsUpdateText, setNewsUpdateText] = useState('');

    const [categoryId, setCategoryId] = useState(1);
    const [category, setCategory] = useState(txtCategory1);

    const [refreshing, setRefreshing] = useState(false);

    let maxLengthTitle = 35;
    let maxLengthText = 45;

    const textInputRef1 = createRef();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setIsSpinner(true);
        GetMyAllNews();
    }, []);

    function capitalize(str) {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }

    const LogOut = () => {
        onClose();
        removeData();
        navigation.goBack();
    };

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem('newsToken');
            navigation.navigate("Welcome");
        } catch (e) {
            console.log(e);
        }
    }

    const DeleteRequestAsk = (newsId) => {
        Alert.alert(txtNewsOptionsAlertAsk, txtNewsOptionsAlertText, [
            {
                text: txtNewsOptionsAlertNo,
            },
            {
                text: txtNewsOptionsAlertYes, onPress: () => DeleteRequest(newsId)
            },
        ]);
    };

    const LogOutAsk = () => {
        Alert.alert(txtLogOutAlertAsk, txtLogOutAlertText, [
            {
                text: txtLogOutAlertNo,
            },
            {
                text: txtLogOutAlertYes, onPress: LogOut
            },
        ]);
    };

    const IconButtonsExit = () => {
        return (
            <TouchableOpacity onPress={() => { LogOutAsk() }}>
                <Icon as={MaterialIcon} name="exit-to-app" size={30} color={'black'} />
            </TouchableOpacity>
        )
    };

    const IconButtonsSettings = () => {
        return (
            <TouchableOpacity onPress={() => { navigation.navigate("Settings") }}>
                <Icon as={MaterialIcon} name="settings" size={30} color={'black'} />
            </TouchableOpacity>
        )
    };

    const MyCategoryText = () => {
        if (MyStore.categoryIdRedux == 1) {
            return txtCategory1;
        } else if (MyStore.categoryIdRedux == 2) {
            return txtCategory2;
        } else if (MyStore.categoryIdRedux == 3) {
            return txtCategory3;
        } else if (MyStore.categoryIdRedux == 4) {
            return txtCategory4;
        } else if (MyStore.categoryIdRedux == 5) {
            return txtCategory5;
        } else if (MyStore.categoryIdRedux == 6) {
            return txtCategory6;
        }
    }

    const Category1 = () => {
        setCategoryId(1);
        setCategory(txtCategory1);
    };

    const Category2 = () => {
        setCategoryId(2);
        setCategory(txtCategory2);
    };

    const Category3 = () => {
        setCategoryId(3);
        setCategory(txtCategory3);
    };

    const Category4 = () => {
        setCategoryId(4);
        setCategory(txtCategory4);
    };

    const Category5 = () => {
        setCategoryId(5);
        setCategory(txtCategory5);
    };

    const Category6 = () => {
        setCategoryId(6);
        setCategory(txtCategory6);
    };

    const NewsCategory = () => {
        if (newsCategoryId == 1) {
            Category1();
        } else if (newsCategoryId == 2) {
            Category2();
        } else if (newsCategoryId == 3) {
            Category3();
        } else if (newsCategoryId == 4) {
            Category4();
        } else if (newsCategoryId == 5) {
            Category5();
        } else if (newsCategoryId == 6) {
            Category6();
        }
    }

    useEffect(() => {
        NewsCategory();
    }, [newsCategoryId])

    const IconButtonsTurnBack = () => {
        return (
            <TouchableOpacity onPress={() => { setIsUpdate(false); }}>
                <Icon as={Ionicons} name="arrow-back" size={30} color={'black'} />
            </TouchableOpacity>
        )
    };

    const IconButtonsProfileMenu = () => {
        return (
            <TouchableOpacity onPress={() => {
                setIsProfileMenu(true);
                setIsProfileMenuPhoto(false);
                onOpen();
            }}>
                <Icon as={Ionicons} name="md-menu-sharp" size={30} color={'black'} style={{ marginRight: 20 }} />
            </TouchableOpacity>
        )
    };

    const SelectButtonCategories = () => {
        return (
            <Center>
                <FormControl style={styles.select}>
                    <FormControl.Label>
                    </FormControl.Label>
                    <Select
                        backgroundColor='rgb(220, 220, 220)'
                        borderRadius={100}
                        minWidth="78%"
                        padding={3}
                        value={category}
                        placeholderTextColor={'#FF0000'}
                        placeholder={category}
                        _selectedItem={{
                            bg: 'black',
                            endIcon: <CheckIcon size={5} />,
                        }}
                        mt="1">
                        <Select.Item label={txtCategory1} value={Category1} />
                        <Select.Item label={txtCategory2} value={Category2} />
                        <Select.Item label={txtCategory3} value={Category3} />
                        <Select.Item label={txtCategory4} value={Category4} />
                        <Select.Item label={txtCategory5} value={Category5} />
                        <Select.Item label={txtCategory6} value={Category6} />
                    </Select>
                </FormControl>
            </Center >
        );
    };

    useEffect(() => {
        setIsSpinner(true);
        GetMyAllNews();
    }, [])

    useEffect(() => {
        GetMyAllNews();
        dispatch(SetIsComment(false));
    }, [MyStore.isComment])

    const GetMyAllNews = () => {
        fetch(MyStore.proxyRedux + '/news/userNews/' + MyStore.idRedux,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + MyStore.tokenRedux,
                }
            })
            .then(response => {
                response.json().then(dataJson => {
                    dataJson.reverse();
                    console.log("dataJson ", dataJson);
                    setMyNews(dataJson);
                    setIsLikedButton(false);
                    setIsUpdate(false);
                    setTimeout(() => {
                        setIsSpinner(false);
                        setRefreshing(false);
                    }, 150);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    const LikeRequest = (newsId, userId) => {
        fetch(MyStore.proxyRedux + '/likes', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newsId: newsId,
                userId: userId,
            }),
        })
            .then(response => {
                if (response.status == 201) {
                    GetMyAllNews();
                } else if (response.status == 200) {
                    GetMyAllNews();
                } else {
                    toast.show({
                        render: () => {
                            return (
                                <Box
                                    style={styles.alertBox}
                                    bg="error.200"
                                    px="2"
                                    py="1"
                                    rounded="sm"
                                    mb={5}>
                                    <WarningIcon
                                        style={styles.toastAlert}
                                        CircleIcon
                                        name="warning-1"
                                        color="error.500"
                                    />
                                    {txtNewsUpdateNoAlert}
                                </Box>
                            );
                        },
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const ControlUpdateRequest = () => {
        if (newsUpdateTitle.length != 0) {
            if (newsUpdateText.length != 0) {
                if (newsCategoryId != categoryId || newsUpdateTitle != newsTitle || newsUpdateText != newsText) {
                    UpdateRequest();
                } else {
                    setIsUpdate(false);
                }
            } else {
                toast.show({
                    render: () => {
                        return (
                            <Box
                                style={styles.alertBox}
                                bg="error.200"
                                px="2"
                                py="1"
                                rounded="sm"
                                mb={5}>
                                <WarningIcon
                                    style={styles.toastAlert}
                                    CircleIcon
                                    name="warning-1"
                                    color="error.500"
                                />
                                {txtNewsUpdateTextNot}
                            </Box>
                        );
                    },
                });
            }
        } else {
            toast.show({
                render: () => {
                    return (
                        <Box
                            style={styles.alertBox}
                            bg="error.200"
                            px="2"
                            py="1"
                            rounded="sm"
                            mb={5}>
                            <WarningIcon
                                style={styles.toastAlert}
                                CircleIcon
                                name="warning-1"
                                color="error.500"
                            />
                            {txtNewsUpdateTitleNot}
                        </Box>
                    );
                },
            });
        }
    }

    const UpdateRequest = () => {
        fetch(MyStore.proxyRedux + '/news', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: newsId,
                categoryId: categoryId,
                title: newsUpdateTitle,
                text: newsUpdateText,
            }),
        })
            .then(response => {
                if (response.status == 200) {
                    GetMyAllNews();
                    toast.show({
                        render: () => {
                            return (
                                <Box
                                    style={styles.alertBox}
                                    bg="success.200"
                                    px="2"
                                    py="1"
                                    rounded="sm"
                                    mb={5}>
                                    <CheckCircleIcon
                                        style={styles.toastAlert}
                                        name="check-circle"
                                        color="emerald.500"
                                    />
                                    {txtNewsUpdateOkAlert}
                                </Box>
                            );
                        },
                    });
                } else {
                    toast.show({
                        render: () => {
                            return (
                                <Box
                                    style={styles.alertBox}
                                    bg="error.200"
                                    px="2"
                                    py="1"
                                    rounded="sm"
                                    mb={5}>
                                    <WarningIcon
                                        style={styles.toastAlert}
                                        CircleIcon
                                        name="warning-1"
                                        color="error.500"
                                    />
                                    {txtNewsUpdateNoAlert}
                                </Box>
                            );
                        },
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const DeleteRequest = (newsId) => {
        fetch(MyStore.proxyRedux + '/news/' + newsId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status == 200) {
                    onClose();
                    toast.show({
                        render: () => {
                            return (
                                <Box
                                    style={styles.alertBox}
                                    bg="success.200"
                                    px="2"
                                    py="1"
                                    rounded="sm"
                                    mb={5}>
                                    <CheckCircleIcon
                                        style={styles.toastAlert}
                                        name="check-circle"
                                        color="emerald.500"
                                    />
                                    {txtNewsDeleteOkAlert}
                                </Box>
                            );
                        },
                    });
                    GetMyAllNews();
                } else {
                    onClose();
                    toast.show({
                        render: () => {
                            return (
                                <Box
                                    style={styles.alertBox}
                                    bg="error.200"
                                    px="2"
                                    py="1"
                                    rounded="sm"
                                    mb={5}>
                                    <WarningIcon
                                        style={styles.toastAlert}
                                        CircleIcon
                                        name="warning-1"
                                        color="error.500"
                                    />
                                    {txtNewsUpdateNoAlert}
                                </Box>
                            );
                        },
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const favoriteButtonColor = (likesUsers) => {
        if (likesUsers.length != 0) {
            let likeList = likesUsers.split(",");
            let isLiked = likeList.indexOf("" + MyStore.idRedux);
            if (isLiked != -1) {
                return '#FF0000';
            } else {
                return 'black';
            }
        } else {
            return 'black';
        }
    }

    const NewsCategoryText = (newsCategoryIdProp) => {
        if (newsCategoryIdProp == 1) {
            return txtCategory1;
        } else if (newsCategoryIdProp == 2) {
            return txtCategory2;
        } else if (newsCategoryIdProp == 3) {
            return txtCategory3;
        } else if (newsCategoryIdProp == 4) {
            return txtCategory4;
        } else if (newsCategoryIdProp == 5) {
            return txtCategory5;
        } else if (newsCategoryIdProp == 6) {
            return txtCategory6;
        }
    }

    const PickerCamera = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                launchCamera({
                    saveToPhotos: true,
                    mediaType: 'photo',
                    includeBase64: false,
                }, (response) => {
                    console.log('Response = ', response);
                    SendFormData(response);

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    }
                    else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    }
                    else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    }
                })
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const PickerPhotos = async () => {
        try {
            launchImageLibrary({}, (response) => {
                console.log('Response = ', response);
                SendFormData(response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }
                else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
            })
        } catch (err) {
            console.warn(err);
        }
    }

    const SendFormData = async (image) => {
        console.log("imageAssets => ", image.assets[0]);
        console.log("imageAssets => ", image.assets[0].uri);
        let formData = new FormData();
        let imageType;
        if (image.assets[0].type == 'image/jpeg' || image.assets[0].type == 'image/jpg') {
            imageType = '.jpg'
        } else if (image.assets[0].type == 'image/png') {
            imageType = '.png'
        }
        console.log("imageType => ", imageType);
        formData.append("file", {
            uri: image.assets[0].uri,
            type: image.assets[0].type, // or photo.mine
            name: MyStore.usernameRedux + imageType,
        });
        let response = await fetch(MyStore.proxyRedux + '/users/changePhoto/' + MyStore.idRedux, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then(response => {
                response.json().then(imageJson => {
                    console.log('imageJson ', imageJson);
                    if (response.status == 200) {
                        dispatch(SetImagePath(imageJson.photo));
                        toast.show({
                            render: () => {
                                return (
                                    <Box
                                        style={styles.alertBox}
                                        bg="success.200"
                                        px="2"
                                        py="1"
                                        rounded="sm"
                                        mb={5}>
                                        <CheckCircleIcon
                                            style={styles.toastAlert}
                                            name="check-circle"
                                            color="emerald.500"
                                        />
                                        {txtPhotoAlertUpOk}
                                    </Box>
                                );
                            },
                        });
                    } else if (response.status == 502) {
                        toast.show({
                            render: () => {
                                return (
                                    <Box
                                        style={styles.alertBox}
                                        bg="error.200"
                                        px="2"
                                        py="1"
                                        rounded="sm"
                                        mb={5}>
                                        <WarningIcon
                                            style={styles.toastAlert}
                                            CircleIcon
                                            name="warning-1"
                                            color="error.500"
                                        />
                                        {txtPhotoAlertUpNo}
                                    </Box>
                                );
                            },
                        });
                    } else {
                        toast.show({
                            render: () => {
                                return (
                                    <Box
                                        style={styles.alertBox}
                                        bg="error.200"
                                        px="2"
                                        py="1"
                                        rounded="sm"
                                        mb={5}>
                                        <WarningIcon
                                            style={styles.toastAlert}
                                            CircleIcon
                                            name="warning-1"
                                            color="error.500"
                                        />
                                        {txtPhotoAlertNo}
                                    </Box>
                                );
                            },
                        });
                    }
                });
            })
            .catch(err => {
                console.log(err);
            });

        console.log("response => ", response);
    };

    const SendNoFormData = () => {
        fetch(MyStore.proxyRedux + '/users/noPhoto/' + MyStore.idRedux, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status == 200) {
                    dispatch(SetImagePath('http:/192.168.1.40:8080/images/noProfile.png'));
                    toast.show({
                        render: () => {
                            return (
                                <Box
                                    style={styles.alertBox}
                                    bg="success.200"
                                    px="2"
                                    py="1"
                                    rounded="sm"
                                    mb={5}>
                                    <CheckCircleIcon
                                        style={styles.toastAlert}
                                        name="check-circle"
                                        color="emerald.500"
                                    />
                                    {txtPhotoAlertDeleteOk}
                                </Box>
                            );
                        },
                    });
                } else if (response.status == 502) {
                    toast.show({
                        render: () => {
                            return (
                                <Box
                                    style={styles.alertBox}
                                    bg="error.200"
                                    px="2"
                                    py="1"
                                    rounded="sm"
                                    mb={5}>
                                    <WarningIcon
                                        style={styles.toastAlert}
                                        CircleIcon
                                        name="warning-1"
                                        color="error.500"
                                    />
                                    {txtPhotoAlertDeleteIs}
                                </Box>
                            );
                        },
                    });
                } else {
                    toast.show({
                        render: () => {
                            return (
                                <Box
                                    style={styles.alertBox}
                                    bg="error.200"
                                    px="2"
                                    py="1"
                                    rounded="sm"
                                    mb={5}>
                                    <WarningIcon
                                        style={styles.toastAlert}
                                        CircleIcon
                                        name="warning-1"
                                        color="error.500"
                                    />
                                    {txtPhotoAlertNo}
                                </Box>
                            );
                        },
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const Action = () => {
        if (isProfileMenu == true && isProfileMenuPhoto == false) {
            return (
                <Center flex={1} px="3">
                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                        <Actionsheet.Content>
                            <Box w="100%" h={60} px={4} justifyContent="center">
                                <Text style={styles.actionTitle}>
                                    {txtProfileOptions}
                                </Text>
                            </Box>
                            <Actionsheet.Item style={{ justifyContent: 'center', color: 'yellow' }} startIcon={<Icon as={MaterialIcon} name="settings" color={'black'} size={5} />} onPress={() => {
                                navigation.navigate("Settings");
                                onClose();
                            }}>
                                <Text style={styles.actionText}>
                                    {txtSettings}
                                </Text>
                            </Actionsheet.Item>
                            <Actionsheet.Item startIcon={<Icon as={Ionicons} name={"newspaper"} color={"black"} size={5} />} onPress={() => {
                                navigation.navigate("Saves");
                                onClose();
                            }}>
                                <Text style={styles.actionText}>
                                    {txtSaves}
                                </Text>
                            </Actionsheet.Item>
                            <Actionsheet.Item startIcon={<Icon as={MaterialIcon} name="exit-to-app" color={'black'} size={5} />} onPress={() => {
                                LogOutAsk();
                            }}>
                                <Text style={styles.actionText}>
                                    {txtLogOut}
                                </Text>
                            </Actionsheet.Item>
                            <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"close"} color={"black"} size={5} />} onPress={() => { onClose(); }}>
                                <Text style={styles.actionText}>
                                    {txtCancel}
                                </Text>
                            </Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>
                </Center>
            );
        } else if (isProfileMenu == true && isProfileMenuPhoto == true) {
            return (
                <Center flex={1} px="3">
                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                        <Actionsheet.Content>
                            <Box w="100%" h={60} px={4} justifyContent="center">
                                <Text style={styles.actionTitle}>
                                    {txtPhotoTitle}
                                </Text>
                            </Box>
                            <Actionsheet.Item startIcon={<Icon as={Entypo} name="camera" color={'black'} size={5} />} onPress={() => {
                                PickerCamera();
                                onClose();
                            }}>
                                <Text style={styles.actionText}>
                                    {txtPhotoCamera}
                                </Text>
                            </Actionsheet.Item>
                            <Actionsheet.Item startIcon={<Icon as={Entypo} name={"images"} color={"black"} size={5} />} onPress={() => {
                                PickerPhotos();
                                onClose();
                            }}>
                                <Text style={styles.actionText}>
                                    {txtPhotoPhotos}
                                </Text>
                            </Actionsheet.Item>
                            <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"image-off"} color={"black"} size={5} />} onPress={() => {
                                SendNoFormData();
                                onClose();
                            }}>
                                <Text style={styles.actionText}>
                                    {txtPhotoNoPhoto}
                                </Text>
                            </Actionsheet.Item>
                            <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"close"} color={"black"} size={5} />} onPress={() => { onClose(); }}>
                                <Text style={styles.actionText}>
                                    {txtCancel}
                                </Text>
                            </Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>
                </Center>
            );
        } else {
            return (
                <Center flex={1} px="3">
                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                        <Actionsheet.Content>
                            <Box w="100%" h={60} px={4} justifyContent="center">
                                <Text style={styles.actionTitle}>
                                    {txtNewsOptions}
                                </Text>
                            </Box>
                            <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"cookie-edit"} color={"black"} size={5} />} onPress={() => {
                                setIsUpdate(true);
                                onClose();
                            }}>
                                <Text style={styles.actionText}>
                                    {txtNewsOptionsEdit}
                                </Text>
                            </Actionsheet.Item>
                            <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"delete"} color={"black"} size={5} />} onPress={() => {
                                DeleteRequestAsk(newsId);
                            }}>
                                <Text style={styles.actionText}>
                                    {txtNewsOptionsDelete}
                                </Text>
                            </Actionsheet.Item>
                            <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"close"} color={"black"} size={5} />} onPress={() => { onClose(); }}>
                                <Text style={styles.actionText}>
                                    {txtCancel}
                                </Text>
                            </Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>
                </Center>
            );
        }
    }

    const MyNews = () => {
        if (isSpinner == false) {
            if (myNews.length != 0) {
                return (
                    <View>
                        {myNews.map((news) => (
                            <View key={news.id}>
                                <View style={styles.newsCard}>
                                    <View style={styles.newsCardFlex}>
                                        <View style={styles.newsCardUp}>
                                            <TouchableOpacity style={styles.newsCardAvatar}>
                                                <Avatar
                                                    style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderWidth: 0.5 }}
                                                    size="40px"
                                                    source={{ uri: MyStore.imagePathRedux }}>
                                                </Avatar>
                                                <Text style={styles.newsCardTextUsername}>{capitalize(news.user.username)}</Text>
                                            </TouchableOpacity>
                                            <View style={styles.newsCardCategory}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                    <Icon as={MaterialIcon} name={"category"} color={"gray"} size={5} style={{ margin: 3 }} />
                                                    <Text style={styles.newsCardTextCategory}>{NewsCategoryText(news.category.id)}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => {
                                                    setIsProfileMenu(false);
                                                    setIsProfileMenuPhoto(false);
                                                    onOpen();

                                                    setNewsId(news.id);
                                                    setNewsUsername(news.user.username);
                                                    setNewsTitle(news.title);
                                                    setNewsText(news.text);
                                                    setNewsCategoryId(news.category.id);
                                                    setNewsLikes(news.likes);
                                                    setNewsLikesUsers(news.likesUsers);
                                                    setNewsComments(news.comments);
                                                    setNewsTime(news.localTime);
                                                    setNewsDate(news.localDate);

                                                    setNewsUpdateCategory(news.categoryId);
                                                    setNewsUpdateTitle(news.title);
                                                    setNewsUpdateText(news.text);
                                                }}>
                                                    <Icon as={Entypo} name={"dots-three-vertical"} color={"black"} size={5} style={{ margin: 5 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={styles.newsCardMid}>
                                            <Text style={styles.newsCardTextTitle}>{news.title}</Text>
                                            <Text style={styles.newsCardTextText}>{news.text}</Text>
                                        </View>
                                        <View style={styles.newsCardDown}>
                                            <View style={styles.newsCardLike}>
                                                <TouchableOpacity onPress={() => {
                                                    if (isLikedButton == false) {
                                                        setIsLikedButton(true);
                                                        LikeRequest(news.id, MyStore.idRedux);
                                                    }
                                                }}>
                                                    <Icon as={AntDesign} name="heart" color={favoriteButtonColor(news.likesUsers)} size={5} style={{ marginLeft: 5 }} />
                                                </TouchableOpacity>
                                                <View>
                                                    <Text style={styles.newsCardTextLike}>{news.likes}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.newsCardComment}>
                                                <TouchableOpacity onPress={() => {
                                                    navigation.navigate("Comments", {
                                                        userId: MyStore.idRedux,
                                                        newsId: news.id
                                                    })
                                                }}>
                                                    <Icon as={FontAwesome} name="comment" color={'black'} size={5} />
                                                </TouchableOpacity>
                                                <View>
                                                    <Text style={styles.newsCardTextComment}>{news.comments}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.newsCardDate}>
                                                <Text style={styles.newsCardTextDate}>{news.localTime[0] + news.localTime[1] + news.localTime[2] + news.localTime[3] + news.localTime[4]}</Text>
                                                <Text style={styles.newsCardTextDate}>{news.localDate[8] + news.localDate[9] + news.localDate[7] + news.localDate[5] + news.localDate[6] + news.localDate[4] + news.localDate[0] + news.localDate[1] + news.localDate[2] + news.localDate[3]}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                );
            } else {
                return (
                    <View>
                        <Text style={{ color: 'black', fontSize: 19, marginTop: 15 }}>{txtNotFoundNews}</Text>
                    </View>
                );
            }
        } else {
            return (
                <View>
                    <ActivityIndicator size="large" color="red" />
                </View>
            );
        }
    }

    const NewsOrUpdate = () => {
        if (isUpdate == false) {
            return (
                <RefreshControl
                    style={styles.refreshControl}
                    onRefresh={onRefresh}
                    refreshing={refreshing}>
                    <ScrollView style={styles.scroll}>
                        <View>
                            <View style={styles.allProfileCard}>
                                <View style={styles.profileCard}>
                                    <View style={styles.profileCardFlex}>
                                        <View style={styles.profileUp}>
                                            <View style={styles.logoutButton}>
                                                {IconButtonsProfileMenu()}
                                            </View>
                                        </View>
                                        <View style={styles.profileDown}>
                                            <View style={styles.avatarUp}>
                                                <TouchableOpacity onPress={() => {
                                                    setIsProfileMenu(true);
                                                    setIsProfileMenuPhoto(true);
                                                    onOpen();
                                                }}>
                                                    <Avatar
                                                        style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderWidth: 0.5 }}
                                                        size="100px"
                                                        source={{ uri: MyStore.imagePathRedux }}>
                                                    </Avatar>
                                                </TouchableOpacity>
                                                <Text style={styles.textUsername}>{capitalize(MyStore.usernameRedux)}</Text>
                                            </View>
                                            <View style={styles.avatarDown}>
                                                <View style={styles.avatarDownAbout}>
                                                    <Icon as={AntDesign} name={"pushpin"} color={"black"} size={5} style={{ margin: 5 }} />

                                                    <Text style={styles.textAbout}>
                                                        {MyStore.aboutRedux}
                                                    </Text>
                                                </View>
                                                <View style={styles.avatarDownCategory}>
                                                    <Icon as={MaterialIcon} name={"category"} color={"black"} size={5} style={{ margin: 5 }} />

                                                    <Text style={styles.textAbout}>
                                                        {MyCategoryText()}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.allNewsCard}>
                                {MyNews()}
                            </View>
                        </View>
                    </ScrollView>
                </RefreshControl>
            );
        } else {
            return (
                <View style={styles.allNewsCard}>
                    <View style={styles.newsUpdateCardUp}>
                        <View style={styles.newsCardTurnBack}>
                            {IconButtonsTurnBack()}
                        </View>
                        <View style={styles.newsCardTxtSettings}>
                            <Text style={styles.newsTextHeader}>
                                {txtNewsUpdateHeader}
                            </Text>
                        </View>
                        <View style={styles.newsCardEmpty}>
                        </View>
                    </View>
                    <View style={styles.newsCardMidBorder}></View>
                    <View style={styles.newsUpdateContainer}>
                        <View style={styles.newsCard}>
                            <View style={styles.newsCardFlex}>
                                <View style={[styles.newsCardCategory, { width: '100%' }]}>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                        <Icon as={MaterialIcon} name={"category"} color={"black"} size={5} style={{ margin: 5 }} />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        {SelectButtonCategories()}
                                    </View>
                                    <TouchableOpacity disabled={true}>
                                        <Menu w="125" trigger={triggerProps => {
                                            return (
                                                <TouchableOpacity disabled={true}>
                                                    <Icon as={Entypo} name={"dots-three-vertical"} color={"black"} size={5} style={{ margin: 5 }} />
                                                </TouchableOpacity>
                                            );
                                        }}>
                                            <Menu.Item>
                                                <Icon as={MaterialCommunityIcons} name={"cookie-edit"} color={"black"} size={5} />
                                                <Text style={styles.newsCardTextText}>düzenle</Text>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Icon as={MaterialCommunityIcons} name={"delete"} color={"black"} size={5} />
                                                <Text style={styles.newsCardTextText}>sil</Text>
                                            </Menu.Item>
                                        </Menu>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.newsCardUp}>
                                    <TouchableOpacity disabled={true} style={styles.newsCardAvatar}>
                                        <Avatar
                                            style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderWidth: 0.5 }}
                                            size="40px"
                                            source={{ uri: MyStore.imagePathRedux }}>
                                        </Avatar>
                                        <Text style={styles.newsCardTextUsername}>{capitalize(newsUsername)}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.newsCardMid}>
                                    <TextInput placeholder={txtNewsUpdateTitle}
                                        style={styles.myTextInput}
                                        defaultValue={newsTitle}
                                        returnKeyType={"next"}
                                        blurOnSubmit={false}
                                        placeholderTextColor={'red'}
                                        maxLength={maxLengthTitle}
                                        onChangeText={(text) => {
                                            setNewsUpdateTitle(text);
                                        }}
                                        onSubmitEditing={() => {
                                            textInputRef1.current && textInputRef1.current.focus();
                                        }}
                                    ></TextInput>
                                    <TextInput placeholder={txtNewsUpdateText}
                                        style={styles.myTextInput}
                                        defaultValue={newsText}
                                        ref={textInputRef1}
                                        returnKeyType={"done"}
                                        blurOnSubmit={false}
                                        placeholderTextColor={'red'}
                                        maxLength={maxLengthText}
                                        onChangeText={(text) => {
                                            setNewsUpdateText(text);
                                        }}
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                            ControlUpdateRequest();
                                        }}
                                    ></TextInput>
                                </View>
                                <View style={styles.newsCardDown}>
                                    <View style={styles.newsCardLike}>
                                        <TouchableOpacity disabled={true}>
                                            <Icon as={AntDesign} name="heart" color={favoriteButtonColor(newsLikesUsers)} size={5} style={{ marginLeft: 5 }} />
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={styles.newsCardTextLike}>{newsLikes}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.newsCardComment}>
                                        <TouchableOpacity disabled={true}>
                                            <Icon as={FontAwesome} name="comment" color={'black'} size={5} />
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={styles.newsCardTextComment}>{newsComments}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.newsCardDate}>
                                        <Text style={styles.newsCardTextDate}>{newsTime[0] + newsTime[1] + newsTime[2] + newsTime[3] + newsTime[4]}</Text>
                                        <Text style={styles.newsCardTextDate}>{newsDate[8] + newsDate[9] + newsDate[7] + newsDate[5] + newsDate[6] + newsDate[4] + newsDate[0] + newsDate[1] + newsDate[2] + newsDate[3]}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.newsUpdateButtons}>
                        <Button bgColor={'red'} btnLabel={txtNewsUpdateHeader} textColor={'white'} Press={() => {
                            ControlUpdateRequest();
                        }} />

                        <Button bgColor={'red'} btnLabel={txtCancel} textColor={'white'} Press={() => {
                            setIsUpdate(false);
                        }} />
                    </View>
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            {NewsOrUpdate()}
            {Action()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },
    allProfileCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: Dimensions.get('screen').height * 0.4,
        marginTop: 10
    },
    profileCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        height: '100%',
        borderRadius: 25,
        backgroundColor: 'rgb(220, 220, 220)',
    },
    allNewsCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    newsCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width * 0.95,
        borderWidth: 0.25,
        borderRadius: 25,
        borderColor: 'black',
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    profileCardFlex: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    profileUp: {
        width: '100%',
        height: '15%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileDown: {
        width: '100%',
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    logoutButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    settingButton: {
        margin: 20
    },
    avatarUp: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    avatarDown: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 10
    },
    avatarDownAbout: {
        width: '100%',
        height: '50%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingLeft: 10,
        padding: 10,
    },
    avatarDownCategory: {
        width: '100%',
        height: '50%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingLeft: 10,
        padding: 10,
    },
    avatarImageFlex: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    textUsername: {
        color: 'black',
        fontSize: 19,
        fontWeight: '500'
    },
    textAbout: {
        color: 'black',
        fontSize: 16,
        margin: 5
    },
    newsCardFlex: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    refreshControl: {
        width: '100%',
        height: '100%',
    },
    newsCardCategory: {
        width: '50%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10
    },
    newsCardUp: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10
    },
    newsCardAvatar: {
        width: '50%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    newsCardMid: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        margin: 10
    },
    newsCardDown: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10
    },
    newsCardLike: {
        width: '25%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    newsCardComment: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    newsCardDate: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    newsCardTextCategory: {
        margin: 3,
        color: 'gray',
        fontSize: 16,
    },
    newsCardTextUsername: {
        margin: 5,
        color: 'black',
        fontSize: 16,
    },
    newsCardTextTitle: {
        margin: 5,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
    },
    newsCardTextText: {
        margin: 5,
        color: 'black',
        fontSize: 14,
    },
    newsCardTextLike: {
        margin: 5,
        color: 'black',
        fontSize: 14,
    },
    newsCardTextComment: {
        margin: 5,
        color: 'black',
        fontSize: 14,
    },
    newsCardTextDate: {
        marginRight: 5,
        color: 'black',
        fontSize: 11,
    },
    newsTextHeader: {
        color: 'black',
        fontWeight: '500',
        fontSize: 25,
        margin: 5
    },
    newsUpdateCardUp: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    newsCardTurnBack: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsCardTxtSettings: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsCardEmpty: {
        width: '20%',
    },
    newsCardMidBorder: {
        width: '100%',
        borderWidth: 0.6,
        borderColor: 'black'
    },
    newsUpdateContainer: {
        width: '95%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsUpdateButtons: {
        width: '78%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myTextInput: {
        borderRadius: 100,
        color: 'red',
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: 'rgb(220, 220, 220)',
        marginBottom: 15,
        paddingLeft: 22,
        paddingRight: 5,
        maxHeight: 100
    },
    select: {
        width: '100%',
        color: 'red',
    },
    alertBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    toastAlert: {
        marginLeft: 5,
        marginRight: 5
    },
    actionTitle: {
        color: 'red',
        fontSize: 20,
        fontWeight: '500'
    },
    actionText: {
        color: 'black',
        fontSize: 16
    },
});

export default Profile;
