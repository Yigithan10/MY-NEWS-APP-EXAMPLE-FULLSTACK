import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    RefreshControl,
    ActivityIndicator,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon, Avatar } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { SetIsUserProfile, SetUserProfileId, SetUserProfileUsername, SetUserProfileAbout, SetUserProfilePhoto, SetUserProfileCategoryId } from '../redux/action';
import Languages from '../../languages.json';

const Search = () => {

    const { MyStore } = useSelector(state => state);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [myUsers, setMyUsers] = useState([]);
    const [isSpinner, setIsSpinner] = useState(false);
    const [username, setUsername] = useState('');

    const maxLengthUsername = 12;

    let txtSearchUser = Languages.languages[MyStore.languageRedux].Search.txtSearchUser;
    let txtUserNotFound = Languages.languages[MyStore.languageRedux].Search.txtUserNotFound;
    let txtUnspecified = Languages.languages[MyStore.languageRedux].Search.txtUnspecified;

    const GetAllUsers = () => {
        fetch(MyStore.proxyRedux + '/users/contains/' + username, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + MyStore.tokenRedux,
            }
        },
        )
            .then(response => {
                response.json().then(dataJson => {
                    console.log(dataJson);
                    setMyUsers(dataJson);
                    setIsSpinner(false);
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (username.length != 0) {
            setIsSpinner(true);
            GetAllUsers();
        }
    }, [username])

    const UsersOrSpinner = () => {
        if (isSpinner == false) {
            if (myUsers.length != 0 && username.length != 0) {
                return (
                    <View style={styles.containerUsers}>
                        <ScrollView style={styles.scroll}>
                            <View style={styles.users}>
                                {myUsers.map((user) => (
                                    <TouchableOpacity key={user.id} style={styles.userCard} onPress={() => {
                                        if (user.id == MyStore.idRedux) {
                                            dispatch(SetIsUserProfile(false));
                                            navigation.navigate('Profile');
                                        } else {
                                            if (user.about == null || user.about == undefined || user.about == '' || user.category.id == null || user.category.id == undefined || user.category.id == '') {
                                                dispatch(SetIsUserProfile(true));
                                                dispatch(SetUserProfileId(user.id));
                                                dispatch(SetUserProfileUsername(user.username));
                                                dispatch(SetUserProfileAbout('belirtilmemiş'));
                                                dispatch(SetUserProfilePhoto(user.photo));
                                                dispatch(SetUserProfileCategoryId(0));
                                                navigation.navigate("UserProfile", {
                                                    userId: user.id,
                                                    userUsername: user.username,
                                                    userAbout: txtUnspecified,
                                                    userPhoto: user.photo,
                                                    userCategoryId: txtUnspecified
                                                })
                                            } else {
                                                dispatch(SetIsUserProfile(true));
                                                dispatch(SetUserProfileId(user.id));
                                                dispatch(SetUserProfileUsername(user.username));
                                                dispatch(SetUserProfileAbout(user.about,));
                                                dispatch(SetUserProfilePhoto(user.photo));
                                                dispatch(SetUserProfileCategoryId(user.category.id));
                                                navigation.navigate("UserProfile", {
                                                    userId: user.id,
                                                    userUsername: user.username,
                                                    userAbout: user.about,
                                                    userPhoto: user.photo,
                                                    userCategoryId: user.category.id
                                                })
                                            }
                                        }
                                    }}>
                                        <View style={styles.userCardAvatar}>
                                            <Avatar
                                                style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderWidth: 0.5 }}
                                                size="30px"
                                                source={{ uri: user.photo }}>
                                            </Avatar>
                                        </View>
                                        <View style={styles.userCardUsername}>
                                            <Text style={styles.userCardTextUsername}>
                                                {user.username}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                );
            } else if (myUsers.length == 0 && username.length != 0) {
                return (
                    <View style={styles.containerUsers}>
                        <Text style={{ color: 'black', fontSize: 19, marginTop: 15 }}>{txtUserNotFound}</Text>
                    </View>
                );
            } else {
                return (
                    <View style={styles.containerUsers}>
                        <Text></Text>
                    </View>
                );
            }
        } else {
            return (
                <View style={styles.containerUsers}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <View style={styles.containerUp}>
                    <View style={styles.containerUpIcon}>
                        <Icon as={Feather} name={'search'} color={'black'} size={30} />
                    </View>
                    <View style={styles.containerUpInput}>
                        <TextInput placeholder={txtSearchUser}
                            style={styles.myTextInput}
                            returnKeyType={"done"}
                            blurOnSubmit={false}
                            placeholderTextColor={'red'}
                            maxLength={maxLengthUsername}
                            onChangeText={(text) => {
                                setUsername(text);
                            }}
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                            }}
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.usersMidBorder}></View>
                {UsersOrSpinner()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    containerUp: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    containerUpIcon: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerUpInput: {
        width: '85%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    usersMidBorder: {
        width: '100%',
        borderWidth: 0.6,
        borderColor: 'black'
    },
    containerUsers: {
        width: '100%',
        height: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    users: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userCard: {
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 0.25,
        borderRadius: 25,
        borderColor: 'black',
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
    },
    userCardAvatar: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        marginLeft: 20
    },
    userCardUsername: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    userCardTextUsername: {
        margin: 5,
        color: 'black',
        fontSize: 16,
    },
    myTextInput: {
        borderRadius: 100,
        color: 'red',
        paddingHorizontal: 10,
        width: '95%',
        backgroundColor: 'rgb(220, 220, 220)',
        paddingLeft: 22,
        paddingRight: 5,
    },
    scroll: {
        width: '100%',
        height: '100%'
    }
});

export default Search;
