import React, { useEffect, useState, createRef } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import Languages from '../../languages.json';
import { CheckCircleIcon, WarningIcon, Icon, useToast, Box } from 'native-base';

const ChangePassword = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();

    const { MyStore } = useSelector(state => state);

    let txtPersonalSettings = Languages.languages[MyStore.languageRedux].Settings.txtPersonalSettings;
    let txtChangePassword = Languages.languages[MyStore.languageRedux].Toast.txtChangePassword;
    let txtPasswordNotAvailable = Languages.languages[MyStore.languageRedux].Toast.txtPasswordNotAvailable;
    let txtNotPasswordSame = Languages.languages[MyStore.languageRedux].Toast.txtNotPasswordSame;
    let txtSomethingWentWrong = Languages.languages[MyStore.languageRedux].Toast.txtSomethingWentWrong;
    let txtOldPassword = Languages.languages[MyStore.languageRedux].Settings.txtOldPassword;
    let txtNewPassword = Languages.languages[MyStore.languageRedux].Settings.txtNewPassword;
    let txtNewPasswordConfirm = Languages.languages[MyStore.languageRedux].Settings.txtNewPasswordConfirm;
    let txtSave = Languages.languages[MyStore.languageRedux].Settings.txtSave;

    const [password, setPassword] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const standartLengthPassword = 6;

    const maxLengthPassword = 18;

    const textInputRef1 = createRef();
    const textInputRef2 = createRef();

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

    const IsPassword = () => {
        if (password.length == 0) {
            return (
                <View>
                    <Text style={styles.myTextInformation}>
                        {password.length}/{standartLengthPassword}
                    </Text>
                </View>
            )
        } else if (password.length < standartLengthPassword) {
            return (
                <View style={styles.lengthAndIcon}>
                    <WarningIcon
                        style={{ marginRight: 5 }}
                        name="warning-1"
                        color="error.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {password.length}/{standartLengthPassword}
                    </Text>
                </View>
            )
        } else if (password.length >= standartLengthPassword) {
            return (
                <View style={styles.lengthAndIcon}>
                    <CheckCircleIcon
                        style={{ marginRight: 5 }}
                        name="check-circle"
                        color="emerald.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {password.length}/{standartLengthPassword}
                    </Text>
                </View>
            )
        }
    }

    const IsNewPassword = () => {
        if (newPassword.length == 0) {
            return (
                <View>
                    <Text style={styles.myTextInformation}>
                        {newPassword.length}/{standartLengthPassword}
                    </Text>
                </View>
            )
        } else if (newPassword.length < standartLengthPassword) {
            return (
                <View style={styles.lengthAndIcon}>
                    <WarningIcon
                        style={{ marginRight: 5 }}
                        name="warning-1"
                        color="error.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {newPassword.length}/{standartLengthPassword}
                    </Text>
                </View>
            )
        } else if (newPassword.length >= standartLengthPassword) {
            return (
                <View style={styles.lengthAndIcon}>
                    <CheckCircleIcon
                        style={{ marginRight: 5 }}
                        name="check-circle"
                        color="emerald.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {newPassword.length}/{standartLengthPassword}
                    </Text>
                </View>
            )
        }
    }

    const IsNewPasswordConfirm = () => {
        if (newPasswordConfirm.length == 0) {
            return (
                <View>
                    <Text style={styles.myTextInformation}>
                        {newPasswordConfirm.length}/{standartLengthPassword}
                    </Text>
                </View>
            )
        } else if (newPasswordConfirm.length < standartLengthPassword) {
            return (
                <View style={styles.lengthAndIcon}>
                    <WarningIcon
                        style={{ marginRight: 5 }}
                        name="warning-1"
                        color="error.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {newPasswordConfirm.length}/{standartLengthPassword}
                    </Text>
                </View>
            )
        } else if (newPasswordConfirm.length >= standartLengthPassword) {
            return (
                <View style={styles.lengthAndIcon}>
                    <CheckCircleIcon
                        style={{ marginRight: 5 }}
                        name="check-circle"
                        color="emerald.500"
                    />
                    <Text style={styles.myTextInformation}>
                        {newPasswordConfirm.length}/{standartLengthPassword}
                    </Text>
                </View>
            )
        }
    }

    const ChangeRequestControl = () => {
        if (password == newPassword || password == newPasswordConfirm) {
            return navigation.goBack();
        } else if (newPassword == newPasswordConfirm && password.length >= standartLengthPassword && newPassword.length >= standartLengthPassword && newPasswordConfirm.length >= standartLengthPassword) {
            ChangeRequest();
        } else if (password.length < standartLengthPassword || newPassword.length < standartLengthPassword || newPasswordConfirm.length < standartLengthPassword) {
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
                            {txtPasswordNotAvailable}
                        </Box>
                    );
                },
            });
        } else if (newPassword != newPasswordConfirm) {
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
                            {txtNotPasswordSame}
                        </Box>
                    );
                },
            });
        }
    }

    const ChangeRequest = () => {
        fetch(MyStore.proxyRedux + '/users/changePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
            },
            body: JSON.stringify({
                id: MyStore.idRedux,
                oldPassword: password,
                newPassword: newPassword,
                newPasswordConfirm: newPasswordConfirm,
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
                                    {txtChangePassword}
                                </Box>
                            );
                        },
                    });
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
                            <Icon as={FontAwesome5} name={"unlock-alt"} color={"black"} size={5} />
                        </View>
                        <View>
                            <Text style={styles.myTextInformation}></Text>
                        </View>
                    </View>
                    <TextInput placeholder={txtOldPassword}
                        style={styles.myTextInput}
                        secureTextEntry={true}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        placeholderTextColor={'red'}
                        maxLength={maxLengthPassword}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                        onSubmitEditing={() => {
                            textInputRef1.current && textInputRef1.current.focus();
                        }}
                    ></TextInput>
                    <View style={styles.informationTextInput}>
                        <View>
                            <Icon as={Entypo} name={"lock"} color={"black"} size={5} />
                        </View>
                        <View>
                            {IsNewPassword()}
                        </View>
                    </View>
                    <TextInput placeholder={txtNewPassword}
                        style={styles.myTextInput}
                        ref={textInputRef1}
                        secureTextEntry={true}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        placeholderTextColor={'red'}
                        maxLength={maxLengthPassword}
                        onChangeText={(text) => {
                            setNewPassword(text);
                        }}
                        onSubmitEditing={() => {
                            textInputRef2.current && textInputRef2.current.focus();
                        }}
                    ></TextInput>
                    <View style={styles.informationTextInput}>
                        <View>
                            <Icon as={Entypo} name={"lock"} color={"black"} size={5} />
                        </View>
                        <View>
                            {IsNewPasswordConfirm()}
                        </View>
                    </View>
                    <TextInput placeholder={txtNewPasswordConfirm}
                        style={styles.myTextInput}
                        ref={textInputRef2}
                        secureTextEntry={true}
                        returnKeyType={"done"}
                        blurOnSubmit={false}
                        placeholderTextColor={'red'}
                        maxLength={maxLengthPassword}
                        onChangeText={(text) => {
                            setNewPasswordConfirm(text);
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

export default ChangePassword;