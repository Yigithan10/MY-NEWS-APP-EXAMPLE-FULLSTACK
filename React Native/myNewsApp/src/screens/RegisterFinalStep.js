import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TextInput, Keyboard, TouchableWithoutFeedback, NativeModules } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Background from "../components/Background";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Icon, Center, FormControl, Select, CheckIcon, Box, useToast, WarningIcon, CheckCircleIcon } from 'native-base';
import Button from "../components/Button";
import { SetAbout, SetCategoryId } from "../redux/action";
import Languages from '../../languages.json';

const RegisterFinalStep = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const toast = useToast();

    const { MyStore } = useSelector(state => state);

    let txtSignup = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtSignup;
    let txtFinalStep = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtFinalStep;
    let txtAbout = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtAbout;
    let txtCategory1 = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtCategory1;
    let txtCategory2 = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtCategory2;
    let txtCategory3 = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtCategory3;
    let txtCategory4 = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtCategory4;
    let txtCategory5 = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtCategory5;
    let txtCategory6 = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtCategory6;
    let txtFinish = Languages.languages[MyStore.phoneLanguage].SignupFinal.txtFinish;

    let txtAboutNotAvailable = Languages.languages[MyStore.phoneLanguage].Toast.txtAboutNotAvailable;
    let txtRegisterSuccess = Languages.languages[MyStore.phoneLanguage].Toast.txtRegisterSuccess;
    let txtSomethingWentWrong = Languages.languages[MyStore.phoneLanguage].Toast.txtSomethingWentWrong;

    const [categoryId, setCategoryId] = useState(2);
    const [category, setCategory] = useState(txtCategory2);
    const [about, setAbout] = useState("");

    const maxLengthAbout = 25;

    const ExitApp = () => {
        BackHandler.exitApp();
    };

    function handleBackButtonClick() {
        ExitApp();
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

    const SelectButtonCategories = () => {
        return (
            <Center>
                <FormControl style={styles.select}>
                    <FormControl.Label>
                        <View style={styles.informationTextInput}>
                            <View style={{ width: '50%' }}>
                                <Icon as={MaterialIcons} name={"category"} color={"black"} size={5} />
                            </View>
                            <View style={{ alignItems: 'flex-end', width: '78%' }}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>
                                    {category}
                                </Text>
                            </View>
                        </View>
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

    const FinalStepRequestControl = () => {
        if (about.length != 0) {
            FinalStepRequest();
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
                            {txtAboutNotAvailable}
                        </Box>
                    );
                },
            });
        }
    }

    const FinalStepRequest = () => {
        fetch(MyStore.proxyRedux + '/auth/register/step1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: MyStore.idRedux,
                about: about,
                categoryId: categoryId,
            })
        })
            .then(response => {
                response.json().then(dataJson => {
                    if (response.status == 200) {
                        SetAbout(dataJson.about);
                        SetCategoryId(dataJson.category.id);
                        console.log("dataJson.id", dataJson.id);
                        console.log("dataJson.about", dataJson.about);
                        console.log("dataJson.categoryId", dataJson.category.id);
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
                                        {txtRegisterSuccess}
                                    </Box>
                                );
                            },
                        });
                        setTimeout(() => {
                            NativeModules.DevSettings.reload();
                        }, 1500)
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
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Background>
                <View style={styles.myCard1}>
                    <Text style={styles.myText1}>
                        {txtSignup}
                    </Text>
                    <View style={styles.myCard2}>
                        <Text style={styles.myText2}>
                            {txtFinalStep}
                        </Text>
                        <View style={styles.informationTextInput}>
                            <View>
                                <Icon as={AntDesign} name={"pushpin"} color={"black"} size={5} />
                            </View>
                        </View>
                        <TextInput placeholder={txtAbout}
                            style={styles.myTextInput}
                            returnKeyType={"done"}
                            blurOnSubmit={false}
                            placeholderTextColor={'red'}
                            maxLength={maxLengthAbout}
                            onChangeText={(text) => {
                                setAbout(text)
                            }}
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                            }}
                        ></TextInput>
                        {SelectButtonCategories()}
                        <View style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '78%',
                            paddingRight: 16,
                            position: 'absolute',
                            bottom: 70
                        }}>
                            <Button bgColor={'red'} btnLabel={txtFinish} textColor={'white'} Press={() => {
                                FinalStepRequestControl();
                            }} />
                        </View>
                    </View>
                </View>
            </Background>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    myCard1: {
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.11,
    },
    myCard2: {
        backgroundColor: 'white',
        width: '100%',
        height: Dimensions.get('window').height * 0.89,
        borderTopLeftRadius: 130,
        paddingTop: 100,
        marginVertical: 10,
        alignItems: 'center',
    },
    myText1: {
        color: 'white',
        fontSize: 64
    },
    myText2: {
        color: 'red',
        fontSize: 40,
        fontWeight: 'bold'
    },
    myTextInput: {
        borderRadius: 100,
        color: 'red',
        paddingHorizontal: 10,
        width: '78%',
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
    informationTextInput: {
        width: '78%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 35
    },
    alertBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    toastAlert: {
        marginLeft: 5,
        marginRight: 5
    }
})

export default RegisterFinalStep;