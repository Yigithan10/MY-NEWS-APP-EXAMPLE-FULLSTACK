import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import Languages from '../../languages.json';

const PersonalSettings = () => {

    const navigation = useNavigation();

    const { MyStore } = useSelector(state => state);

    let txtPersonalSettings = Languages.languages[MyStore.languageRedux].Settings.txtPersonalSettings;
    let txtChangeUsername = Languages.languages[MyStore.languageRedux].Settings.txtChangeUsername;
    let txtChangeEmail = Languages.languages[MyStore.languageRedux].Settings.txtChangeEmail;
    let txtChangePassword = Languages.languages[MyStore.languageRedux].Settings.txtChangePassword;
    let txtChangeLanguage = Languages.languages[MyStore.languageRedux].Settings.txtChangeLanguage;
    let txtChangeAbout = Languages.languages[MyStore.languageRedux].Settings.txtChangeAbout;
    let txtChangeCategory = Languages.languages[MyStore.languageRedux].Settings.txtChangeCategory;

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

    const settingsItem = [
        {
            id: 1,
            text: txtChangeUsername,
            iconFrom: Ionicons,
            iconName: 'person',
            iconColor: 'white',
            iconBackgroundColor: 'blue',
            btnNavigation: 'ChangeUsername'
        },
        {
            id: 2,
            text: txtChangeEmail,
            iconFrom: MaterialCommunityIcons,
            iconName: 'email',
            iconColor: 'white',
            iconBackgroundColor: 'green',
            btnNavigation: 'ChangeEmail'
        },
        {
            id: 3,
            text: txtChangePassword,
            iconFrom: Entypo,
            iconName: 'lock',
            iconColor: 'white',
            iconBackgroundColor: 'red',
            btnNavigation: 'ChangePassword'
        },
        {
            id: 4,
            text: txtChangeLanguage,
            iconFrom: Fontisto,
            iconName: 'language',
            iconColor: 'white',
            iconBackgroundColor: 'darkorange',
            btnNavigation: 'ChangeLanguage'
        },
        {
            id: 5,
            text: txtChangeAbout,
            iconFrom: AntDesign,
            iconName: 'pushpin',
            iconColor: 'white',
            iconBackgroundColor: '#ABB002',
            btnNavigation: 'ChangeAbout'
        },
        {
            id: 6,
            text: txtChangeCategory,
            iconFrom: MaterialIcon,
            iconName: 'category',
            iconColor: 'white',
            iconBackgroundColor: 'purple',
            btnNavigation: 'ChangeCategory'
        },
    ]

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
                {settingsItem.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => {
                        navigation.navigate(item.btnNavigation);
                    }}>
                        <View style={styles.row}>
                            <View style={styles.rowLeft}>
                                <View style={[styles.rowIcon, { backgroundColor: item.iconBackgroundColor }]}>
                                    <item.iconFrom name={item.iconName} color={item.iconColor} size={18} />

                                </View>

                                <View style={styles.rowText}>
                                    <Text style={styles.rowLabel}>{item.text}</Text>
                                </View>
                            </View>

                            <View>

                                <View>
                                    <Feather name='chevron-right' color={'black'} size={14} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'space-between',
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
        width: '99%',
        height: '90%',
        marginTop: 25
    },
    myTextHeader: {
        color: 'black',
        fontWeight: '500',
        fontSize: 25,
        margin: 5
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: 'rgb(220, 220, 220)',
        borderRadius: 8,
        marginBottom: 3,
        paddingHorizontal: 12
    },
    rowLabel: {
        fontSize: 17,
        color: '#0c0c0c'
    },
    rowIcon: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        marginRight: 12
    },
    rowEnd: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowLeft: {
        flexDirection: 'row'
    },
    rowText: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PersonalSettings;