import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { ScrollView, Icon, Center, Box, Actionsheet, Avatar, useDisclose, useToast, WarningIcon, CheckCircleIcon } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import Languages from '../../languages.json';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SetIsComment, SetIsUserProfile, SetUserProfileAbout, SetUserProfileCategoryId, SetUserProfileId, SetUserProfilePhoto, SetUserProfileUsername } from '../redux/action';

const App = () => {

    const { MyStore } = useSelector(state => state);
    const navigation = useNavigation();
    const toast = useToast();
    const dispatch = useDispatch();

    const [myNews, setMyNews] = useState([]);
    const [myNewsLen, setMyNewsLen] = useState(0);

    const [myNewsCategoryId, setMyNewsCategoryId] = useState(1);

    const [complaintType1, setComplaintType1] = useState(1);
    const [complaintType2, setComplaintType2] = useState(2);
    const [complaintType3, setComplaintType3] = useState(3);

    const [isSpinner, setIsSpinner] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isLikedButton, setIsLikedButton] = useState(false);

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

    let txtCategory1 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory1;
    let txtCategory2 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory2;
    let txtCategory3 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory3;
    let txtCategory4 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory4;
    let txtCategory5 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory5;
    let txtCategory6 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory6;

    let txtNotFoundNews = Languages.languages[MyStore.languageRedux].Profile.txtNotFoundNews;

    let txtSaveNews = Languages.languages[MyStore.languageRedux].UserProfile.txtSaveNews;
    let txtSave = Languages.languages[MyStore.languageRedux].UserProfile.txtSave;
    let txtComplaintNews = Languages.languages[MyStore.languageRedux].UserProfile.txtComplaintNews;
    let txtComplaintNews1 = Languages.languages[MyStore.languageRedux].UserProfile.txtComplaintNews1;
    let txtComplaintNews2 = Languages.languages[MyStore.languageRedux].UserProfile.txtComplaintNews2;
    let txtComplaintNews3 = Languages.languages[MyStore.languageRedux].UserProfile.txtComplaintNews3;
    let txtCancel = Languages.languages[MyStore.languageRedux].UserProfile.txtCancel;
    let txtSaveAlertOk = Languages.languages[MyStore.languageRedux].UserProfile.txtSaveAlertOk;
    let txtSaveAlertAlready = Languages.languages[MyStore.languageRedux].UserProfile.txtSaveAlertAlready;
    let txtSaveAlertNo = Languages.languages[MyStore.languageRedux].UserProfile.txtSaveAlertNo;
    let txtComplaintAlertOk = Languages.languages[MyStore.languageRedux].UserProfile.txtComplaintAlertOk;
    let txtComplaintAlertAlready = Languages.languages[MyStore.languageRedux].UserProfile.txtComplaintAlertAlready;
    let txtComplaintAlertNo = Languages.languages[MyStore.languageRedux].UserProfile.txtComplaintAlertNo;


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setIsSpinner(true);
        GetAllNews(myNewsCategoryId);
    }, []);

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    function capitalize(str) {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
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

    const myCategories = [
        {
            id: 1,
            name: txtCategory1
        },
        {
            id: 2,
            name: txtCategory2
        },
        {
            id: 3,
            name: txtCategory3
        },
        {
            id: 4,
            name: txtCategory4
        },
        {
            id: 5,
            name: txtCategory5
        },
        {
            id: 6,
            name: txtCategory6
        },
    ]

    const NewsCategoryText = (propsCategory) => {
        if (propsCategory == 1) {
            return txtCategory1;
        } else if (propsCategory == 2) {
            return txtCategory2;
        } else if (propsCategory == 3) {
            return txtCategory3;
        } else if (propsCategory == 4) {
            return txtCategory4;
        } else if (propsCategory == 5) {
            return txtCategory5;
        } else if (propsCategory == 6) {
            return txtCategory6;
        }
    }

    const GetAllNews = (categoryId) => {
        fetch(categoryId == 1 ? MyStore.proxyRedux + '/news' : MyStore.proxyRedux + '/news/categories/' + categoryId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + MyStore.tokenRedux,
                }
            })
            .then(response => {
                response.json().then(dataJson => {
                    console.log("dataJson ", dataJson);
                    dataJson.reverse();
                    setMyNews(dataJson);
                    setIsLikedButton(false);
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

    useEffect(() => {
        setMyNewsCategoryId(1);
        setIsSpinner(true);
        GetAllNews(myNewsCategoryId);
    }, [])

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
                    GetAllNews(myNewsCategoryId);
                } else if (response.status == 200) {
                    GetAllNews(myNewsCategoryId);
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
                                    {"birseyler yanlis gitti!"}
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

    const SaveProfileRequest = () => {
        fetch(MyStore.proxyRedux + '/saves', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newsId: newsId,
                userId: MyStore.idRedux,
            }),
        })
            .then(response => {
                if (response.status == 201) {
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
                                    {txtSaveAlertOk}
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
                                    {txtSaveAlertAlready}
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
                                    {txtSaveAlertNo}
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

    const ComplaintRequest = (newsId, complaintTypeId) => {
        fetch(MyStore.proxyRedux + '/complaints', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: MyStore.idRedux,
                newsId: newsId,
                complaintTypeId: complaintTypeId,
            }),
        })
            .then(response => {
                if (response.status == 201) {
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
                                    {txtComplaintAlertOk}
                                </Box>
                            );
                        },
                    });
                    GetMyAllNews();
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
                                    {txtComplaintAlertAlready}
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
                                    {txtComplaintAlertNo}
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

    const MyNews = () => {
        if (isSpinner == false) {
            if (myNews.length != 0) {
                return (
                    <View>
                        {myNews.map((news) => (
                            <View key={news.id} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.newsCard}>
                                    <View style={styles.newsCardFlex}>
                                        <View style={styles.newsCardUp}>
                                            <TouchableOpacity style={styles.newsCardAvatar} onPress={() => {
                                                if (news.user.id == MyStore.idRedux) {
                                                    dispatch(SetIsUserProfile(false));
                                                    navigation.navigate('Profile');
                                                } else {
                                                    dispatch(SetIsUserProfile(true));
                                                    dispatch(SetUserProfileId(news.user.id));
                                                    dispatch(SetUserProfileUsername(news.user.username));
                                                    dispatch(SetUserProfileAbout(news.user.about,));
                                                    dispatch(SetUserProfilePhoto(news.user.photo));
                                                    dispatch(SetUserProfileCategoryId(news.user.category.id));
                                                    navigation.navigate("UserProfile", {
                                                        userId: news.user.id,
                                                        userUsername: news.user.username,
                                                        userAbout: news.user.about,
                                                        userPhoto: news.user.photo,
                                                        userCategoryId: news.user.category.id
                                                    })
                                                }
                                            }}>
                                                <Avatar
                                                    style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderWidth: 0.5 }}
                                                    size="40px"
                                                    source={{ uri: news.user.photo }}>
                                                </Avatar>
                                                <Text style={styles.newsCardTextUsername}>{capitalize(news.user.username)}</Text>
                                            </TouchableOpacity>
                                            <View style={styles.newsCardCategory}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                    <Icon as={MaterialIcon} name={"category"} color={"gray"} size={5} style={{ margin: 3 }} />
                                                    <Text style={styles.newsCardTextCategory}>{NewsCategoryText(news.category.id)}</Text>
                                                </View>
                                                {news.user.id != MyStore.idRedux ? (
                                                    <TouchableOpacity onPress={() => {
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

                                                        onOpen();
                                                    }}>
                                                        <Icon as={Entypo} name={"dots-three-vertical"} color={"black"} size={5} style={{ margin: 5 }} />
                                                    </TouchableOpacity>
                                                )
                                                    :
                                                    (
                                                        <Text></Text>
                                                    )}
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
                                                        userId: news.user.id,
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
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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

    const Action = () => {
        return (
            <Center flex={1} px="3">
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text style={styles.actionTitle}>
                                {txtSaveNews}
                            </Text>
                        </Box>
                        <Actionsheet.Item startIcon={<Icon as={Ionicons} name={"newspaper"} color={"black"} size={5} />} onPress={() => {
                            SaveProfileRequest(newsId);
                            onClose();
                        }}>
                            <Text style={styles.actionText}>
                                {txtSave}
                            </Text>
                        </Actionsheet.Item>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text style={styles.actionTitle}>
                                {txtComplaintNews}
                            </Text>
                        </Box>
                        <Actionsheet.Item startIcon={<Icon as={AntDesign} name={"exclamationcircle"} color={"black"} size={5} />} onPress={() => {
                            ComplaintRequest(newsId, complaintType1);
                            onClose();
                        }}>
                            <Text style={styles.actionText}>
                                {txtComplaintNews1}
                            </Text>
                        </Actionsheet.Item>

                        <Actionsheet.Item startIcon={<Icon as={AntDesign} name={"exclamationcircle"} color={"black"} size={5} />} onPress={() => {
                            ComplaintRequest(newsId, complaintType2);
                            onClose();
                        }}>
                            <Text style={styles.actionText}>
                                {txtComplaintNews2}
                            </Text>
                        </Actionsheet.Item>

                        <Actionsheet.Item startIcon={<Icon as={AntDesign} name={"exclamationcircle"} color={"black"} size={5} />} onPress={() => {
                            ComplaintRequest(newsId, complaintType3);
                            onClose();
                        }}>
                            <Text style={styles.actionText}>
                                {txtComplaintNews3}
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

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.categories}>
                {Action()}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {myCategories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            disabled={category.id == myNewsCategoryId ? true : false}
                            style={styles.categoryCard}
                            onPress={() => {
                                if (category.id != myNewsCategoryId) {
                                    setMyNewsCategoryId(category.id);
                                    setIsSpinner(true);
                                    GetAllNews(category.id);
                                }
                            }}>
                            <Text style={[styles.categoryText, { color: myNewsCategoryId == category.id ? 'red' : 'black', borderColor: myNewsCategoryId == category.id ? 'red' : 'black' }]}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={{ borderWidth: 0.6, borderColor: 'black' }}></View>
            <View style={styles.allNewsCard}>
                <RefreshControl
                    style={styles.refreshControl}
                    onRefresh={onRefresh}
                    refreshing={refreshing}>
                    <ScrollView style={styles.scroll}>
                        {MyNews()}
                    </ScrollView>
                </RefreshControl>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },
    categories: {
        height: '10%'
    },
    categoryCard: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    categoryText: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        fontSize: 16,
    },
    allNewsCard: {
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myNewsContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
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

export default App;
