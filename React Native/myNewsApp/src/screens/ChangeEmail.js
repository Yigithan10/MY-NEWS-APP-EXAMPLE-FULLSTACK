import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import Languages from '../../languages.json';
import { CheckCircleIcon, WarningIcon, Icon, useToast, Box } from 'native-base';
import { SetEmail } from '../redux/action';

const ChangeEmail = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();

    const { MyStore } = useSelector(state => state);

    let txtPersonalSettings = Languages.languages[MyStore.languageRedux].Settings.txtPersonalSettings;
    let txtChangeEmail = Languages.languages[MyStore.languageRedux].Toast.txtChangeEmail;
    let txtEmailNotAvailable = Languages.languages[MyStore.languageRedux].Toast.txtEmailNotAvailable;
    let txtSomethingWentWrong = Languages.languages[MyStore.languageRedux].Toast.txtSomethingWentWrong;
    let txtEmail = Languages.languages[MyStore.languageRedux].Signup.txtEmail;
    let txtSave = Languages.languages[MyStore.languageRedux].Settings.txtSave;

    const [email, setEmail] = useState(MyStore.emailRedux);
    const [isEmail, setIsEmail] = useState('');
    const [emailRegex, setEmailRegex] = useState(false);

    const standartLengthEmail = 13;

    const maxLengthEmail = 21;

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

    const handleValidEmail = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (val.length === 0) {
            setEmailRegex(false);
        } else if (reg.test(val) === false) {
            setEmailRegex(false);
        } else if (reg.test(val) === true) {
            setEmailRegex(true);
        }
    };

    useEffect(() => {
        if (email.length != 0) {
            fetch(MyStore.proxyRedux + '/auth/email/' + email, {
                method: 'GET',
            },
            )
                .then(response => {
                    console.log(response.status);
                    if (response.status == 200) {
                        if (email.length >= standartLengthEmail) {
                            setIsEmail(true);
                        } else {
                            setIsEmail(false);
                        }
                    } else {
                        setIsEmail(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [email])

    const IsEmail = () => {
        if (email.length == 0 || email==MyStore.emailRedux) {
            return (
                <View>
                    <Text style={styles.myTextInformation}>
                        {email.length}/{standartLengthEmail}
                    </Text>
                </View>
            )
        } else if (email.length < standartLengthEmail || emailRegex == false || isEmail == false) {
            return (
                <View style={styles.lengthAndIcon}>
                    <WarningIcon
                        style={{ marginRight: 5 }}
                        name="warning-1"
                        color="error.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {email.length}/{standartLengthEmail}
                    </Text>
                </View>
            )
        } else if (email.length >= standartLengthEmail && emailRegex == true && isEmail == true) {
            return (
                <View style={styles.lengthAndIcon}>
                    <CheckCircleIcon
                        style={{ marginRight: 5 }}
                        name="check-circle"
                        color="emerald.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {email.length}/{standartLengthEmail}
                    </Text>
                </View>
            )
        }
    }

    const ChangeRequestControl = () => {
        if (email == MyStore.emailRedux) {
            return navigation.goBack();
        } else if (email.length >= standartLengthEmail && emailRegex == true && isEmail == true) {
            ChangeRequest();
        } else if (email.length < standartLengthEmail || emailRegex == false || isEmail == false) {
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
                            {txtEmailNotAvailable}
                        </Box>
                    );
                },
            });
        }
    }

    const ChangeRequest = () => {
        fetch(MyStore.proxyRedux + '/users/changeEmail', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
            },
            body: JSON.stringify({
                id: MyStore.idRedux,
                email: email,
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
                                    {txtChangeEmail}
                                </Box>
                            );
                        },
                    });
                    dispatch(SetEmail(email));
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
                            <Icon as={MaterialCommunityIcons} name={"email"} color={"black"} size={5} />
                        </View>
                        <View>
                            {IsEmail()}
                        </View>
                    </View>
                    <TextInput placeholder={txtEmail}
                        style={styles.myTextInput}
                        defaultValue={email}
                        keyboardType={"email-address"}
                        returnKeyType={"done"}
                        blurOnSubmit={false}
                        placeholderTextColor={'red'}
                        maxLength={maxLengthEmail}
                        onChangeText={(text) => {
                            setEmail(text);
                            handleValidEmail(text);
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

export default ChangeEmail;