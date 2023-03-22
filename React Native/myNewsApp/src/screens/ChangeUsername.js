import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import Languages from '../../languages.json';
import { CheckCircleIcon, WarningIcon, Icon, useToast, Box } from 'native-base';
import { SetUsername } from '../redux/action';

const ChangeUsername = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();

    const { MyStore } = useSelector(state => state);

    let txtPersonalSettings = Languages.languages[MyStore.languageRedux].Settings.txtPersonalSettings;
    let txtChangeUsername = Languages.languages[MyStore.languageRedux].Toast.txtChangeUsername;
    let txtUsernameNotAvailable = Languages.languages[MyStore.languageRedux].Toast.txtUsernameNotAvailable;
    let txtSomethingWentWrong = Languages.languages[MyStore.languageRedux].Toast.txtSomethingWentWrong;
    let txtUsername = Languages.languages[MyStore.languageRedux].Login.txtUsername;
    let txtSave = Languages.languages[MyStore.languageRedux].Settings.txtSave;

    const [username, setUsername] = useState(MyStore.usernameRedux);
    const [isUsername, setIsUsername] = useState(false);

    const standartLengthUsername = 5;

    const maxLengthUsername = 12;

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
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                <Icon as={Ionicons} name="arrow-back" size={30} color={'black'} />
            </TouchableOpacity>
        )
    };

    useEffect(() => {
        if (username.length != 0) {
            fetch(MyStore.proxyRedux + '/auth/username/' + username, {
                method: 'GET',
            },
            )
                .then(response => {
                    console.log(response.status);
                    if (response.status == 200) {
                        if (username.length >= standartLengthUsername) {
                            setIsUsername(true);
                        } else {
                            setIsUsername(false);
                        }
                    } else {
                        setIsUsername(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [username])

    const IsUsername = () => {
        if (username.length == 0 || username == MyStore.usernameRedux) {
            return (
                <View>
                    <Text style={styles.myTextInformation}>
                        {username.length}/{standartLengthUsername}
                    </Text>
                </View>
            )
        } else if (username.length < standartLengthUsername || isUsername == false) {
            return (
                <View style={styles.lengthAndIcon}>
                    <WarningIcon
                        style={{ marginRight: 5 }}
                        name="warning-1"
                        color="error.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {username.length}/{standartLengthUsername}
                    </Text>
                </View>
            )
        } else if (username.length >= standartLengthUsername && isUsername == true) {
            return (
                <View style={styles.lengthAndIcon}>
                    <CheckCircleIcon
                        style={{ marginRight: 5 }}
                        name="check-circle"
                        color="emerald.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {username.length}/{standartLengthUsername}
                    </Text>
                </View>
            )
        }
    }

    const ChangeRequestControl = () => {
        if (username == MyStore.usernameRedux) {
            return navigation.goBack();
        } else if (username.length >= standartLengthUsername && isUsername == true) {
            ChangeRequest();
        } else if (username.length < standartLengthUsername || isUsername == false) {
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
                            {txtUsernameNotAvailable}
                        </Box>
                    );
                },
            });
        }
    }

    const ChangeRequest = () => {
        fetch(MyStore.proxyRedux + '/users/changeUsername', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
            },
            body: JSON.stringify({
                id: MyStore.idRedux,
                username: username,
            })
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
                                    {txtChangeUsername}
                                </Box>
                            );
                        },
                    });
                    dispatch(SetUsername(username));
                    navigation.goBack();
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
                                    {txtSomethingWentWrong}
                                </Box>
                            );
                        },
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <View style={styles.background}>
            <View style={styles.myCardUp}>
                <View style={styles.myCardTurnBack}>
                    {IconButtonsTurnBack()}
                </View>
                <View style={styles.myCardTxtSettings}>
                    <Text style={styles.myTextHeader}>{txtPersonalSettings}</Text>
                </View>
                <View style={styles.myCardEmpty}>
                </View>
            </View>
            <View style={styles.myCardMid}></View>
            <View style={styles.myCardDown}>
                <View style={styles.myCardInput}>
                    <View style={styles.informationTextInput}>
                        <View>
                            <Icon as={Ionicons} name={"person"} color={"black"} size={5} />
                        </View>
                        <View>
                            {IsUsername()}
                        </View>
                    </View>
                    <TextInput placeholder={txtUsername}
                        style={styles.myTextInput}
                        defaultValue={username}
                        keyboardType={"username"}
                        returnKeyType={"done"}
                        blurOnSubmit={false}
                        placeholderTextColor={'red'}
                        maxLength={maxLengthUsername}
                        onChangeText={(text) => {
                            setUsername(text);
                        }}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                            ChangeRequestControl();
                        }}
                    ></TextInput>
                </View>
                <View style={styles.myCardBtn}>
                    <Button bgColor={'red'} btnLabel={txtSave} textColor={'white'} Press={() => {
                        ChangeRequestControl();
                    }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
    myCardDown: {
        width: '78%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myTextHeader: {
        color: 'black',
        fontWeight: '500',
        fontSize: 25,
        margin: 5
    },
    myCardInput: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myCardBtn: {
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myTextInput: {
        borderRadius: 100,
        color: 'red',
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: 'rgb(220, 220, 220)',
        marginBottom: 20,
        paddingLeft: 12
    },
    informationTextInput: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    lengthAndIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
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
    myTextInformation: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default ChangeUsername;