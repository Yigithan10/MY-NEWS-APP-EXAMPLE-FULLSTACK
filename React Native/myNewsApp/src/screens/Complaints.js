import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity, ActivityIndicator, Dimensions, Alert, RefreshControl } from 'react-native';
import { Icon, Avatar, useDisclose, Actionsheet, Center, Box, useToast, WarningIcon, CheckCircleIcon, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import Languages from '../../languages.json';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SetIsComment, SetIsUserProfile, SetUserProfileAbout, SetUserProfileCategoryId, SetUserProfileId, SetUserProfilePhoto, SetUserProfileUsername } from '../redux/action';

const Complaints = () => {

    const navigation = useNavigation();

    const { MyStore } = useSelector(state => state);
    const toast = useToast();
    const dispatch = useDispatch();

    const [myNews, setMyNews] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isSpinner, setIsSpinner] = useState(false);

    const [complaintId, setComplaintId] = useState(0);

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setIsSpinner(true);
        GetAllNews();
    }, []);

    let txtComplaints = Languages.languages[MyStore.languageRedux].Settings.txtComplaints;

    let txtCategory1 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory1;
    let txtCategory2 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory2;
    let txtCategory3 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory3;
    let txtCategory4 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory4;
    let txtCategory5 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory5;
    let txtCategory6 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory6;

    let txtNotFoundNews = Languages.languages[MyStore.languageRedux].Profile.txtNotFoundNews;

    let txtComplaintsHeader = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsHeader;
    let txtComplaintsOptions = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsOptions;
    let txtComplaintsOptionsDelete = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsOptionsDelete;
    let txtComplaintsOptionsCancel = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsOptionsCancel;
    let txtComplaintsOptionsAlertAsk = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsOptionsAlertAsk;
    let txtComplaintsOptionsAlertText = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsOptionsAlertText;
    let txtComplaintsOptionsAlertNo = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsOptionsAlertNo;
    let txtComplaintsOptionsAlertYes = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsOptionsAlertYes;
    let txtComplaintsAlertOk = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsAlertOk;
    let txtComplaintsAlertNo = Languages.languages[MyStore.languageRedux].Complaints.txtComplaintsAlertNo;

    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    const DeleteRequestAsk = () => {
        Alert.alert(txtComplaintsOptionsAlertAsk, txtComplaintsOptionsAlertText, [
            {
                text: txtComplaintsOptionsAlertNo,
            },
            {
                text: txtComplaintsOptionsAlertYes, onPress: () => DeleteRequest(),
            },
        ]);
    };

    const DeleteRequest = () => {
        fetch(MyStore.proxyRedux + '/complaints/' + complaintId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                onClose();
                if (response.status == 200) {
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
                                    {txtComplaintsAlertOk}
                                </Box>
                            );
                        },
                    });
                    setIsSpinner(true);
                    GetAllNews();
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
                                    {txtComplaintsAlertNo}
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

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);

    const IconButtonsTurnBack = () => {
        return (
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                <Icon as={Ionicons} name="arrow-back" size={30} color={'black'} />
            </TouchableOpacity>
        )
    };


    const GetAllNews = () => {
        fetch(MyStore.proxyRedux + '/complaints/' + MyStore.idRedux,
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
                    setTimeout(() => {
                        setRefreshing(false);
                        setIsSpinner(false);
                    }, 150);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        setIsSpinner(true);
        GetAllNews();
    }, [])

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

    const NewsOrSpinner = () => {
        if (isSpinner == false) {
            if (myNews.length != 0) {
                return (
                    <View style={styles.myNewsContainer}>
                        <RefreshControl style={styles.refreshControl}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        >
                            <ScrollView style={styles.scroll}>
                                {myNews.map((complaint) => (
                                    <View key={complaint.id} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={styles.newsCard}>
                                            <View style={styles.newsCardFlex}>
                                                <View style={styles.newsCardUp}>
                                                    <TouchableOpacity style={styles.newsCardAvatar} onPress={() => {
                                                        if (complaint.news.user.id == MyStore.idRedux) {
                                                            dispatch(SetIsUserProfile(false));
                                                            navigation.navigate('Profile');
                                                        } else {
                                                            dispatch(SetIsUserProfile(true));
                                                            dispatch(SetUserProfileId(complaint.news.user.id));
                                                            dispatch(SetUserProfileUsername(complaint.news.user.username));
                                                            dispatch(SetUserProfileAbout(complaint.news.user.about,));
                                                            dispatch(SetUserProfilePhoto(complaint.news.user.photo));
                                                            dispatch(SetUserProfileCategoryId(complaint.news.user.category.id));
                                                            navigation.navigate("UserProfile", {
                                                                userId: complaint.news.user.id,
                                                                userUsername: complaint.news.user.username,
                                                                userAbout: complaint.news.user.about,
                                                                userPhoto: complaint.news.user.photo,
                                                                userCategoryId: complaint.news.user.category.id
                                                            })
                                                        }
                                                    }}>
                                                        <Avatar
                                                            style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderWidth: 0.5 }}
                                                            size="40px"
                                                            source={{ uri: complaint.user.photo }}>
                                                        </Avatar>
                                                        <Text style={styles.newsCardTextUsername}>{capitalize(complaint.news.user.username)}</Text>
                                                    </TouchableOpacity>
                                                    <View style={styles.newsCardCategory}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                            <Icon as={MaterialIcon} name={"category"} color={"gray"} size={5} style={{ margin: 3 }} />
                                                            <Text style={styles.newsCardTextCategory}>{NewsCategoryText(complaint.news.category.id)}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() => {
                                                            setComplaintId(complaint.id);
                                                            onOpen();
                                                        }}>
                                                            <Icon as={Entypo} name={"dots-three-vertical"} color={"black"} size={5} style={{ margin: 5 }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={styles.newsCardMid}>
                                                    <Text style={styles.newsCardTextTitle}>{complaint.news.title}</Text>
                                                    <Text style={styles.newsCardTextText}>{complaint.news.text}</Text>
                                                </View>
                                                <View style={styles.newsCardDown}>
                                                    <View style={styles.newsCardLike}>
                                                        <TouchableOpacity disabled={true}>
                                                            <Icon as={AntDesign} name="heart" color={favoriteButtonColor(complaint.news.likesUsers)} size={5} style={{ marginLeft: 5 }} />
                                                        </TouchableOpacity>
                                                        <View>
                                                            <Text style={styles.newsCardTextLike}>{complaint.news.likes}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.newsCardComment}>
                                                        <TouchableOpacity disabled={true}>
                                                            <Icon as={FontAwesome} name="comment" color={'black'} size={5} />
                                                        </TouchableOpacity>
                                                        <View>
                                                            <Text style={styles.newsCardTextComment}>{complaint.news.comments}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.newsCardDate}>
                                                        <Text style={styles.newsCardTextDate}>{complaint.news.localTime[0] + complaint.news.localTime[1] + complaint.news.localTime[2] + complaint.news.localTime[3] + complaint.news.localTime[4]}</Text>
                                                        <Text style={styles.newsCardTextDate}>{complaint.news.localDate[8] + complaint.news.localDate[9] + complaint.news.localDate[7] + complaint.news.localDate[5] + complaint.news.localDate[6] + complaint.news.localDate[4] + complaint.news.localDate[0] + complaint.news.localDate[1] + complaint.news.localDate[2] + complaint.news.localDate[3]}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </RefreshControl>
                    </View>
                );
            } else {
                return (
                    <View style={styles.myNewsContainer}>
                        <Text style={{ color: 'black', fontSize: 19, marginTop: 15 }}>{txtNotFoundNews}</Text>
                    </View>
                );
            }
        } else {
            return (
                <View style={styles.myNewsContainer}>
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
                                {txtComplaintsOptions}
                            </Text>
                        </Box>
                        <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"delete"} color={"black"} size={5} />} onPress={() => {
                            DeleteRequestAsk();
                        }}>
                            <Text style={styles.actionText}>
                                {txtComplaintsOptionsDelete}
                            </Text>
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"close"} color={"black"} size={5} />} onPress={() => { onClose(); }}>
                            <Text style={styles.actionText}>
                                {txtComplaintsOptionsCancel}
                            </Text>
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
        );
    }

    return (
        <View style={styles.background}>
            <View style={styles.myCardUp}>
                <View style={styles.myCardTurnBack}>
                    {IconButtonsTurnBack()}
                </View>
                <View style={styles.myCardTxtSettings}>
                    <Text style={styles.myTextHeader}>{txtComplaints}</Text>
                </View>
                <View style={styles.myCardEmpty}>
                </View>
            </View>
            <View style={styles.myCardMid}></View>
            <View style={styles.myCardAllNews}>
                {NewsOrSpinner()}
                {Action()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    myCardUp: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    myCardTurnBack: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myCardTxtSettings: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myCardEmpty: {
        width: '20%',
    },
    myCardMid: {
        width: '100%',
        borderWidth: 0.6,
        borderColor: 'black'
    },
    myCardAllNews: {
        width: '100%',
        height: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    myTextHeader: {
        color: 'black',
        fontWeight: '500',
        fontSize: 25,
        margin: 5
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
})

export default Complaints;