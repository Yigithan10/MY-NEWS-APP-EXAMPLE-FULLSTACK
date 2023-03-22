import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Platform, NativeModules, Dimensions } from 'react-native'
import Background from '../components/Background';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Languages from '../../languages.json';
import RNExitApp from 'react-native-exit-app';

const Welcome = () => {

    const navigation = useNavigation();

    const { MyStore } = useSelector(state => state);

    let txtWelcome = Languages.languages[MyStore.phoneLanguage].Welcome.txtWelcome;
    let txtLogin = Languages.languages[MyStore.phoneLanguage].Welcome.txtLogin;
    let txtSignup = Languages.languages[MyStore.phoneLanguage].Welcome.txtSignup;

    const ExitApp = () => {
        RNExitApp.exitApp();
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

    return (
        <Background>
            <View style={styles.myCard}>
                <Text style={[styles.myText, { marginTop: 75, marginBottom: 125 }]}>
                    {txtWelcome}
                </Text>
                <Button bgColor={'red'} btnLabel={txtLogin} textColor={'white'} Press={() => navigation.navigate("Login")} />
                <Button bgColor={'white'} btnLabel={txtSignup} textColor={'red'} Press={() => navigation.navigate("Signup")} />
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    myCard: {
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 100,
        marginHorizontal: 40
    },
    myText: {
        color: 'white',
        fontSize: 54,
    },
})

export default Welcome;