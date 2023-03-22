import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, BackHandler, ActivityIndicator, TouchableOpacity, TextInput, Keyboard, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, CheckCircleIcon, WarningIcon, Icon, useToast, Box, Avatar, Menu, Center, FormControl, Select, CheckIcon, Actionsheet, useDisclose } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SetIsComment, SetIsUserProfile, SetUserProfileAbout, SetUserProfileCategoryId, SetUserProfileId, SetUserProfilePhoto, SetUserProfileUsername } from '../redux/action';
import Button from '../components/Button';
import Languages from '../../languages.json';

const Comments = ({ route }) => {
    const { userId, newsId } = route.params;

    const { MyStore } = useSelector(state => state);

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const navigation = useNavigation();
    const toast = useToast();
    const dispatch = useDispatch();

    const [myComments, setMyComments] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isSpinner, setIsSpinner] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [comment, setComment] = useState('');
    const [updateCommentId, setUpdateCommentId] = useState('');
    const [updateCommentText, setUpdateCommentText] = useState('');
    const [updateNewCommentText, setUpdateNewCommentText] = useState('');
    const [createComment, setCreateComment] = useState('');

    const [commentId, setCommentId] = useState('');
    const [commentNewsId, setCommentNewsId] = useState('');

    let maxLengthComment = 25;

    let txtComments = Languages.languages[MyStore.languageRedux].Comments.txtComments;
    let txtCommentsOptions = Languages.languages[MyStore.languageRedux].Comments.txtCommentsOptions;
    let txtCommentsOptionsEdit = Languages.languages[MyStore.languageRedux].Comments.txtCommentsOptionsEdit;
    let txtCommentsOptionsDelete = Languages.languages[MyStore.languageRedux].Comments.txtCommentsOptionsDelete;
    let txtCommentsOptionsCancel = Languages.languages[MyStore.languageRedux].Comments.txtCommentsOptionsCancel;
    let txtCommentsUpdate = Languages.languages[MyStore.languageRedux].Comments.txtCommentsUpdate;
    let txtUpdate = Languages.languages[MyStore.languageRedux].Comments.txtUpdate;
    let txtCreateComments = Languages.languages[MyStore.languageRedux].Comments.txtCreateComments;
    let txtAlertCreateOk = Languages.languages[MyStore.languageRedux].Comments.txtAlertCreateOk;
    let txtAlertDeleteOk = Languages.languages[MyStore.languageRedux].Comments.txtAlertDeleteOk;
    let txtAlertUpdateOk = Languages.languages[MyStore.languageRedux].Comments.txtAlertUpdateOk;
    let txtAlertWrong = Languages.languages[MyStore.languageRedux].Comments.txtAlertWrong;
    let txtAlertNot = Languages.languages[MyStore.languageRedux].Comments.txtAlertNot;

    let txtAlertAsk = Languages.languages[MyStore.languageRedux].Comments.txtAlertAsk;
    let txtAlertText = Languages.languages[MyStore.languageRedux].Comments.txtAlertText;
    let txtAlertNo = Languages.languages[MyStore.languageRedux].Comments.txtAlertNo;
    let txtAlertYes = Languages.languages[MyStore.languageRedux].Comments.txtAlertYes;

    function capitalize(str) {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }

    const DeleteRequestAsk = (commentId, commentNewsId) => {
        Alert.alert(txtAlertAsk, txtAlertText, [
            {
                text: txtAlertNo,
            },
            {
                text: txtAlertYes, onPress: () => DeleteRequest(commentId, commentNewsId)
            },
        ]);
    };

    function handleBackButtonClick() {
        navigation.goBack();
        return true;
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
            <TouchableOpacity onPress={() => {
                if (isUpdate == false) {
                    if (MyStore.isUserProfile == true) {
                        dispatch(SetIsUserProfile(false));
                        navigation.navigate('UserProfile', {
                            userId: MyStore.userProfileId,
                            userUsername: MyStore.userProfileUsername,
                            userAbout: MyStore.userProfileAbout,
                            userPhoto: MyStore.userProfilePhoto,
                            userCategoryId: MyStore.userProfileCategoryId
                        });
                    } else {
                        if (isUpdate == false) {
                            navigation.goBack();
                        } else {
                            setIsUpdate(false);
                        }
                    }
                } else {
                    setIsUpdate(false);
                }
            }}>
                <Icon as={Ionicons} name="arrow-back" size={30} color={'black'} />
            </TouchableOpacity>
        )
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setIsSpinner(true);
        GetAllComments();
    }, []);


    const GetAllComments = () => {
        fetch(MyStore.proxyRedux + '/comments/' + newsId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + MyStore.tokenRedux,
                }
            })
            .then(response => {
                response.json().then(dataJson => {
                    console.log("dataJson ", dataJson);
                    setMyComments(dataJson);
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
        GetAllComments();
    }, [])

    useEffect(() => {
        setIsSpinner(true);
        GetAllComments();
    }, [userId, newsId])

    const DeleteRequest = (commentId, commentNewsId) => {
        onClose();
        fetch(MyStore.proxyRedux + '/comments/' + commentId + "/" + commentNewsId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
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
                                    {txtAlertDeleteOk}
                                </Box>
                            );
                        },
                    });
                    setIsSpinner(true);
                    GetAllComments();
                    dispatch(SetIsComment(true));
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
                                    {txtAlertWrong}
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

    const CreateCommentRequest = () => {
        fetch(MyStore.proxyRedux + '/comments', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: MyStore.idRedux,
                newsId: newsId,
                text: createComment,
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
                                    {txtAlertCreateOk}
                                </Box>
                            );
                        },
                    });
                    setIsSpinner(true);
                    GetAllComments();
                    dispatch(SetIsComment(true));
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
                                    {txtAlertWrong}
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

    const ControlCreateRequest = () => {
        if (createComment.length != 0) {
            CreateCommentRequest();
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
                            {txtAlertNot}
                        </Box>
                    );
                },
            });
        }
    }

    const UpdateCommentRequest = () => {
        fetch(MyStore.proxyRedux + '/comments', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: updateCommentId,
                text: updateNewCommentText,
            }),
        })
            .then(response => {
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
                                    {txtAlertUpdateOk}
                                </Box>
                            );
                        },
                    });
                    setIsUpdate(false);
                    GetAllComments();
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
                                    {txtAlertWrong}
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
        if (updateNewCommentText.length != 0) {
            if (updateCommentText != updateNewCommentText) {
                UpdateCommentRequest();
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
                            {txtAlertNot}
                        </Box>
                    );
                },
            });
        }
    }

    const AllCommentsOrUpdateComment = () => {
        if (isUpdate == false) {
            if (isSpinner == false) {
                if (myComments.length != 0) {
                    return (
                        <View style={styles.container}>
                            <View style={styles.allCommentsContainer}>
                                <RefreshControl
                                    style={styles.refreshControl}
                                    onRefresh={onRefresh}
                                    refreshing={refreshing}>
                                    <ScrollView style={styles.scroll}>
                                        <View style={styles.allComments}>
                                            {myComments.map((comment) => (
                                                <View key={comment.id} style={styles.commentCard}>
                                                    <View style={styles.commentCardFlex}>
                                                        <View style={styles.commentLeft}>
                                                            <View style={styles.commentLeftAvatar}>
                                                                <TouchableOpacity style={styles.commentLeftAvatarFlex} onPress={() => {
                                                                    if (comment.user.id == MyStore.idRedux) {
                                                                        dispatch(SetIsUserProfile(false));
                                                                        navigation.navigate('Profile');
                                                                    } else {
                                                                        dispatch(SetIsUserProfile(true));
                                                                        dispatch(SetUserProfileId(comment.user.id));
                                                                        dispatch(SetUserProfileUsername(comment.user.username));
                                                                        dispatch(SetUserProfileAbout(comment.user.about,));
                                                                        dispatch(SetUserProfilePhoto(comment.user.photo));
                                                                        dispatch(SetUserProfileCategoryId(comment.user.category.id));
                                                                        navigation.navigate("UserProfile", {
                                                                            userId: comment.user.id,
                                                                            userUsername: comment.user.username,
                                                                            userAbout: comment.user.about,
                                                                            userPhoto: comment.user.photo,
                                                                            userCategoryId: comment.user.category.id
                                                                        })
                                                                    }
                                                                }}>
                                                                    <Avatar
                                                                        style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderWidth: 0.5 }}
                                                                        size="30px"
                                                                        source={{ uri: comment.user.photo }}>
                                                                    </Avatar>
                                                                    <Text style={styles.commentCardTextUsername}>{capitalize(comment.user.username)}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        <View style={styles.commentMid}>
                                                            <Text style={styles.commentCardTextText}>{comment.text}</Text>
                                                        </View>
                                                        <View style={styles.commentRight}>
                                                            {comment.user.id == MyStore.idRedux ? (
                                                                <TouchableOpacity onPress={() => {
                                                                    setUpdateCommentId(comment.id);
                                                                    setUpdateCommentText(comment.text);

                                                                    setCommentId(comment.id);
                                                                    setCommentNewsId(comment.news.id);

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
                                                    <View style={styles.commentDateTime}>
                                                        <Text style={styles.commentCardTextDate}>{comment.localTime[0] + comment.localTime[1] + comment.localTime[2] + comment.localTime[3] + comment.localTime[4] + "  |  " + comment.localDate[8] + comment.localDate[9] + comment.localDate[4] + comment.localDate[5] + comment.localDate[6] + comment.localDate[4] + comment.localDate[0] + comment.localDate[1] + comment.localDate[2] + comment.localDate[3]}</Text>
                                                    </View>
                                                    <View style={styles.commentCardMidBorderFlex}>
                                                        <View style={styles.commentCardMidBorder}></View>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </RefreshControl>
                            </View>
                            <View style={styles.myCardMidBorder}></View>
                            <View style={styles.sendComment}>
                                <View style={styles.inputFlex}>
                                    <TextInput placeholder={txtCreateComments}
                                        style={styles.myTextInput}
                                        returnKeyType={"done"}
                                        blurOnSubmit={false}
                                        placeholderTextColor={'red'}
                                        maxLength={maxLengthComment}
                                        onChangeText={(text) => {
                                            setCreateComment(text);
                                        }}
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                            ControlCreateRequest();
                                        }}
                                    ></TextInput>
                                </View>
                                <View style={styles.sendBtnFlex}>
                                    <TouchableOpacity onPress={() => {
                                        ControlCreateRequest();
                                    }}>
                                        <Icon as={Ionicons} name="send" size={25} color={'black'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                } else {
                    return (
                        <View style={styles.container}>
                            <View style={styles.allCommentsContainer}>
                                <Text>hiç yorum yok</Text>
                            </View>
                            <View style={styles.myCardMidBorder}></View>
                            <View style={styles.sendComment}>
                                <View style={styles.inputFlex}>
                                    <TextInput placeholder={'create comment'}
                                        style={styles.myTextInput}
                                        returnKeyType={"done"}
                                        blurOnSubmit={false}
                                        placeholderTextColor={'red'}
                                        maxLength={maxLengthComment}
                                        onChangeText={(text) => {
                                            setCreateComment(text);
                                        }}
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                            ControlCreateRequest();
                                        }}
                                    ></TextInput>
                                </View>
                                <View style={styles.sendBtnFlex}>
                                    <TouchableOpacity onPress={() => {
                                        ControlCreateRequest();
                                    }}>
                                        <Icon as={Ionicons} name="send" size={25} color={'black'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                }
            } else {
                return (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="red" />
                    </View>
                );
            }
        } else {
            return (
                <View style={styles.commentUpdateContainer}>
                    <View style={styles.commentUpdateTextInput}>
                        <TextInput placeholder={txtCommentsUpdate}
                            style={styles.myTextInput}
                            defaultValue={updateCommentText}
                            returnKeyType={"done"}
                            blurOnSubmit={false}
                            placeholderTextColor={'red'}
                            maxLength={maxLengthComment}
                            onChangeText={(text) => {
                                setUpdateNewCommentText(text);
                            }}
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                                ControlUpdateRequest();
                            }}
                        ></TextInput>
                    </View>
                    <View style={styles.commentUpdateButtons}>
                        <Button bgColor={'red'} btnLabel={txtUpdate} textColor={'white'} Press={() => {
                            ControlUpdateRequest();
                        }} />
                    </View>
                </View>
            );
        }
    }

    const MyCommentText = () => {
        if (isUpdate == false) {
            return txtComments;
        } else {
            return txtCommentsUpdate;
        }
    }

    const Action = () => {
        return (
            <Center flex={1} px="3">
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text style={styles.actionTitle}>
                                {txtCommentsOptions}
                            </Text>
                        </Box>
                        <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"cookie-edit"} color={"black"} size={5} />} onPress={() => {
                            setIsUpdate(true);
                            onClose();
                        }}>
                            <Text style={styles.actionText}>
                                {txtCommentsOptionsEdit}
                            </Text>
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"delete"} color={"black"} size={5} />} onPress={() => {
                            DeleteRequestAsk(commentId, commentNewsId);
                        }}>
                            <Text style={styles.actionText}>
                                {txtCommentsOptionsDelete}
                            </Text>
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={MaterialCommunityIcons} name={"close"} color={"black"} size={5} />} onPress={() => { onClose(); }}>
                            <Text style={styles.actionText}>
                                {txtCommentsOptionsCancel}
                            </Text>
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
        );
    }

    return (
        <View style={styles.background}>
            {Action()}
            <View style={styles.myCardUp}>
                <View style={styles.myCardTurnBack}>
                    {IconButtonsTurnBack()}
                </View>
                <View style={styles.myCardTxtSettings}>
                    <Text style={styles.myTextHeader}>{MyCommentText()}</Text>
                </View>
                <View style={styles.myCardEmpty}>
                </View>
            </View>
            <View style={styles.myCardMidBorder}></View>
            {AllCommentsOrUpdateComment()}
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
    myCardMidBorder: {
        width: '100%',
        borderWidth: 0.6,
        borderColor: 'black'
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    allCommentsContainer: {
        width: '100%',
        height: '75%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    allComments: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    sendComment: {
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputFlex: {
        width: '80%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    sendBtnFlex: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    myTextInput: {
        borderRadius: 100,
        color: 'red',
        width: '100%',
        backgroundColor: 'rgb(220, 220, 220)',
        paddingLeft: 22,
        paddingRight: 5,
        maxHeight: 100,
    },
    refreshControl: {
        width: '100%',
        height: '100%',
    },
    scroll: {
        width: '100%',
        height: '100%',
    },
    commentCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 5,
    },
    commentCardFlex: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 5
    },
    commentLeft: {
        width: '35%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    commentMid: {
        width: '55%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 3
    },
    commentRight: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentLeftAvatar: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    commentLeftAvatarFlex: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    commentDateTime: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 5,
    },
    commentCardMidBorderFlex: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentCardMidBorder: {
        width: '100%',
        borderWidth: 0.6,
        borderColor: 'black',
        margin: 5,
    },
    commentCardTextUsername: {
        margin: 5,
        color: 'black',
        fontSize: 16,
    },
    commentCardTextText: {
        margin: 5,
        color: 'black',
        fontSize: 14,
    },
    commentCardTextDate: {
        marginRight: 7,
        color: 'black',
        fontSize: 11,
    },
    commentUpdateContainer: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentUpdateTextInput: {
        width: '78%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentUpdateButtons: {
        width: '78%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
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
    myTextHeader: {
        color: 'black',
        fontWeight: '500',
        fontSize: 25,
        margin: 5
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

export default Comments;