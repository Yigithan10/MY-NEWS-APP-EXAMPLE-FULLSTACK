import React, { useState, useEffect } from 'react';
import { View, Platform, NativeModules, Alert, BackHandler } from 'react-native';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  SetId,
  SetUsername,
  SetEmail,
  SetLanguage,
  SetAbout,
  SetImagePath,
  SetCategoryId,
  SetTime,
  SetDate,
  SetToken,
  SetPhoneLanguage,
} from '../redux/action';
import { useToast, Box, WarningIcon } from 'native-base';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Languages from '../../languages.json';

const Splash = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  const { MyStore } = useSelector(state => state);

  let localeLanguage;
  const localeLanguageLearn =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[3] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  const getLocaleLanguage = async () => {
    if (localeLanguageLearn == 'en_US') {
      localeLanguage = 'eng';
    } else if (localeLanguageLearn == 'de_DE') {
      localeLanguage = 'ger';
    } else if (localeLanguageLearn == 'fr_FR') {
      localeLanguage = 'fra';
    } else if (localeLanguageLearn == 'tr_TR') {
      localeLanguage = 'tur';
    } else {
      localeLanguage = 'eng';
    }

    console.log("localeLanguage" + localeLanguage);
    dispatch(SetPhoneLanguage(localeLanguage));
  }

  useEffect(() => {
    getLocaleLanguage();
  }, [])

  let txtAsk = Languages.languages[MyStore.phoneLanguage].Splash.txtAsk;
  let txtText = Languages.languages[MyStore.phoneLanguage].Splash.txtText;
  let txtNo = Languages.languages[MyStore.phoneLanguage].Splash.txtNo;
  let txtYes = Languages.languages[MyStore.phoneLanguage].Splash.txtYes;

  const SendParserToken = (token) => {
    getLocaleLanguage();
    fetch(MyStore.proxyRedux + '/auth/parser/' + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    )
      .then(response => {
        response.json().then(dataJson => {
          if (response.status == 200) {
            if (dataJson.about == null || dataJson.about == undefined) {
              dispatch(SetToken(token));
              dispatch(SetId(dataJson.id));
              dispatch(SetUsername(dataJson.username));
              dispatch(SetEmail(dataJson.email));
              dispatch(SetLanguage(dataJson.language));
              dispatch(SetImagePath(dataJson.photo));
              dispatch(SetTime(dataJson.localTime));
              dispatch(SetDate(dataJson.localDate));
              console.log("token", token);
              console.log("dataJson", dataJson);
              console.log("dataJson.id", dataJson.id);
              console.log("dataJson.username", dataJson.username);
              console.log("dataJson.email", dataJson.email);
              console.log("dataJson.language", dataJson.language);
              console.log("dataJson.photo", dataJson.photo);
              console.log("dataJson.localTime", dataJson.localTime);
              console.log("dataJson.localDate", dataJson.localDate);
              navigation.navigate('RegisterFinalStep');
            } else {
              dispatch(SetToken(token));
              dispatch(SetId(dataJson.id));
              dispatch(SetUsername(dataJson.username));
              dispatch(SetEmail(dataJson.email));
              dispatch(SetLanguage(dataJson.language));
              dispatch(SetAbout(dataJson.about));
              dispatch(SetImagePath(dataJson.photo));
              dispatch(SetCategoryId(dataJson.category.id));
              dispatch(SetTime(dataJson.localTime));
              dispatch(SetDate(dataJson.localDate));
              console.log("token", token);
              console.log("dataJson", dataJson);
              console.log("dataJson.id", dataJson.id);
              console.log("dataJson.username", dataJson.username);
              console.log("dataJson.email", dataJson.email);
              console.log("dataJson.language", dataJson.language);
              console.log("dataJson.about", dataJson.about);
              console.log("dataJson.photo", dataJson.photo);
              console.log("dataJson.categoryId", dataJson.category.id);
              console.log("dataJson.localTime", dataJson.localTime);
              console.log("dataJson.localDate", dataJson.localDate);
              navigation.navigate('TabsNavigator');
            }
          } else if (response.status == 502) {
            navigation.navigate("Welcome");
          } else {
            navigation.navigate("Welcome");
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('newsToken');
      if (token != null || token != undefined || token != "") {
        SendParserToken(token);
      } else {
        navigation.navigate("Welcome");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const ExitApp = () => {
    BackHandler.exitApp();
    return true;
  }

  const AgainTry = () => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      if (state.isConnected) {
        getData();
      } else {
        MyAlert();
      }
    });
  }

  const MyAlert = () => {
    Alert.alert(txtAsk, txtText, [
      {
        text: txtNo, onPress: ExitApp
      },
      {
        text: txtYes, onPress: AgainTry
      },
    ]);
  }

  const myAnimation = () => {
    return (
      <Lottie
        source={require('../../News.json')}
        autoPlay
        loop={false}
        speed={1}
        onAnimationFinish={() => {
          NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);

            if (state.isConnected) {
              getData();
            } else {
              MyAlert();
            }
          });
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {myAnimation()}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  alertBoxFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  toastAlertMargin: {
    margin: 7,
  },
  text1: {
    fontSize: 28,
    fontStyle: 'italic',
    margin: 5,
  },
  text2: {
    fontSize: 21,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text3: {
    fontSize: 17,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text4: {
    fontSize: 15,
    fontStyle: 'bold',
    color: 'black',
  },
  text5: {
    fontSize: 13,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text6: {
    fontSize: 12,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
  text7: {
    fontSize: 11,
    fontStyle: 'bold',
    color: 'black',
    margin: 5,
  },
})

export default Splash;