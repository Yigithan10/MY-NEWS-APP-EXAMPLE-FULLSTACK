import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import Languages from '../../languages.json';
import { Icon, Center, FormControl, Select, CheckIcon, Box, useToast, WarningIcon, CheckCircleIcon } from 'native-base';
import { SetLanguage } from '../redux/action';

const ChangeLanguage = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();

    const { MyStore } = useSelector(state => state);

    let txtPersonalSettings = Languages.languages[MyStore.languageRedux].Settings.txtPersonalSettings;
    let txtChangeLanguage = Languages.languages[MyStore.languageRedux].Toast.txtChangeLanguage;
    let txtSomethingWentWrong = Languages.languages[MyStore.languageRedux].Toast.txtSomethingWentWrong;
    let txtSave = Languages.languages[MyStore.languageRedux].Settings.txtSave;

    const [language, setLanguage] = useState('eng');
    const [languageName, setLanguageName] = useState('English');

    const LanguageEng = () => {
        setLanguage('eng');
        setLanguageName('English');
    };

    const LanguageDeu = () => {
        setLanguage('ger');
        setLanguageName('Deutsch');
    };

    const LanguageFra = () => {
        setLanguage('fra');
        setLanguageName('Français');
    };

    const LanguageTur = () => {
        setLanguage('tur');
        setLanguageName('Türkçe');
    };

    useEffect(() => {
        if (MyStore.languageRedux == 'eng') {
            LanguageEng();
        } else if (MyStore.languageRedux == 'ger') {
            LanguageDeu();
        } else if (MyStore.languageRedux == 'fra') {
            LanguageFra();
        } else if (MyStore.languageRedux == 'tur') {
            LanguageTur();
        }
    }, [])

    const SelectButtonLanguages = () => {
        return (
            <Center>
                <FormControl style={styles.select}>
                    <FormControl.Label>
                        <View style={styles.informationTextInput}>
                            <View style={{ width: '50%' }}>
                                <Icon as={Fontisto} name={"language"} color={"black"} size={6} />
                            </View>
                            <View style={{ alignItems: 'flex-end', width: '50%' }}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>
                                    {languageName}
                                </Text>
                            </View>
                        </View>
                    </FormControl.Label>
                    <Select
                        backgroundColor='rgb(220, 220, 220)'
                        borderRadius={100}
                        minWidth="78%"
                        padding={3}
                        value={languageName}
                        placeholderTextColor={'#FF0000'}
                        placeholder={languageName}
                        _selectedItem={{
                            bg: 'black',
                            endIcon: <CheckIcon size={5} />,
                        }}
                        mt="1">
                        <Select.Item label="English" value={LanguageEng} />
                        <Select.Item label="Deutsch" value={LanguageDeu} />
                        <Select.Item label="Français" value={LanguageFra} />
                        <Select.Item label="Türkçe" value={LanguageTur} />
                    </Select>
                </FormControl>
            </Center >
        );
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
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                <Icon as={Ionicons} name="arrow-back" size={30} color={'black'} />
            </TouchableOpacity>
        )
    };

    const ChangeRequestControl = () => {
        if (language == MyStore.languageRedux) {
            return navigation.goBack();
        } else {
            ChangeRequest();
        }
    }

    const ChangeRequest = () => {
        fetch(MyStore.proxyRedux + '/users/changeLanguage', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
            },
            body: JSON.stringify({
                id: MyStore.idRedux,
                language: language,
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
                                    {txtChangeLanguage}
                                </Box>
                            );
                        },
                    });
                    dispatch(SetLanguage(language));
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
                <View style={styles.myCardSelect}>
                    {SelectButtonLanguages()}
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
    myCardSelect: {
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
    select: {
        width: '100%',
        color: 'red',
    },
})

export default ChangeLanguage;