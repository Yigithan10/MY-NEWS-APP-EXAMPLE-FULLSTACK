import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import Languages from '../../languages.json';
import { Icon, Center, FormControl, Select, CheckIcon, Box, useToast, WarningIcon, CheckCircleIcon } from 'native-base';
import { SetCategoryId } from '../redux/action';

const ChangeCategory = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();

    const { MyStore } = useSelector(state => state);

    let txtPersonalSettings = Languages.languages[MyStore.languageRedux].Settings.txtPersonalSettings;
    let txtChangeCategory = Languages.languages[MyStore.languageRedux].Toast.txtChangeCategory;
    let txtSomethingWentWrong = Languages.languages[MyStore.languageRedux].Toast.txtSomethingWentWrong;
    let txtSave = Languages.languages[MyStore.languageRedux].Settings.txtSave;

    let txtCategory1 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory1;
    let txtCategory2 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory2;
    let txtCategory3 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory3;
    let txtCategory4 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory4;
    let txtCategory5 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory5;
    let txtCategory6 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory6;

    const [categoryId, setCategoryId] = useState(1);
    const [category, setCategory] = useState(txtCategory1);

    useEffect(() => {
        if (MyStore.categoryIdRedux == 1) {
            Category1();
        } else if (MyStore.categoryIdRedux == 2) {
            Category2();
        } else if (MyStore.categoryIdRedux == 3) {
            Category3();
        } else if (MyStore.categoryIdRedux == 4) {
            Category4();
        } else if (MyStore.categoryIdRedux == 5) {
            Category5();
        } else if (MyStore.categoryIdRedux == 6) {
            Category6();
        }
    }, [])

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
                            <View style={{ alignItems: 'flex-end', width: '50%' }}>
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
        if (categoryId == MyStore.categoryIdRedux) {
            return navigation.goBack();
        } else {
            ChangeRequest();
        }
    }

    const ChangeRequest = () => {
        fetch(MyStore.proxyRedux + '/users/changeCategory', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
            },
            body: JSON.stringify({
                id: MyStore.idRedux,
                categoryId: categoryId,
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
                                    {txtChangeCategory}
                                </Box>
                            );
                        },
                    });
                    dispatch(SetCategoryId(categoryId));
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
                    {SelectButtonCategories()}
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

export default ChangeCategory;