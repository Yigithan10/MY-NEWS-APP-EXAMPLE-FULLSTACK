import React, { createRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Keyboard, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Icon, useToast, Box, WarningIcon, CheckCircleIcon } from 'native-base';
import {
  SetToken,
  SetId,
  SetUsername,
  SetEmail,
  SetLanguage,
  SetAbout,
  SetDate,
  SetTime,
  SetImagePath,
  SetCategoryId,
} from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Languages from '../../languages.json';

const Login = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const textInputRef = createRef();

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  const { MyStore } = useSelector(state => state);

  let txtLogin = Languages.languages[MyStore.phoneLanguage].Login.txtLogin;
  let txtWelcomeBack = Languages.languages[MyStore.phoneLanguage].Login.txtWelcomeBack;
  let txtLoginAccount = Languages.languages[MyStore.phoneLanguage].Login.txtLoginAccount;
  let txtUsername = Languages.languages[MyStore.phoneLanguage].Login.txtUsername;
  let txtPassword = Languages.languages[MyStore.phoneLanguage].Login.txtPassword;
  let txtForgotPassword = Languages.languages[MyStore.phoneLanguage].Login.txtForgotPassword;
  let txtDontHaveAccount = Languages.languages[MyStore.phoneLanguage].Login.txtDontHaveAccount;
  let txtSignup = Languages.languages[MyStore.phoneLanguage].Login.txtSignup;

  let txtUsernameNotAvailable = Languages.languages[MyStore.phoneLanguage].Toast.txtUsernameNotAvailable;
  let txtPasswordNotAvailable = Languages.languages[MyStore.phoneLanguage].Toast.txtPasswordNotAvailable;
  let txtLoginSuccess = Languages.languages[MyStore.phoneLanguage].Toast.txtLoginSuccess;
  let txtUsernameOrPasswordWrong = Languages.languages[MyStore.phoneLanguage].Toast.txtUsernameOrPasswordWrong;
  let txtSomethingWentWrong = Languages.languages[MyStore.phoneLanguage].Toast.txtSomethingWentWrong;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const standartLengthUsername = 5;
  const standartLengthPassword = 6;

  const maxLengthUsername = 12;
  const maxLengthPassword = 18;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const LoginRequestControl = () => {
    if (username.length >= standartLengthUsername) {
      if (password.length >= standartLengthPassword) {
        LoginRequest();
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
                {txtPasswordNotAvailable}
              </Box>
            );
          },
        });
      }
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
              {txtUsernameNotAvailable}
            </Box>
          );
        },
      });
    }
  }

  const setData = async (token) => {
    try {
      await AsyncStorage.setItem('newsToken', token);
    } catch (e) {
      console.log(e);
    }
  }

  const LoginRequest = () => {
    fetch(MyStore.proxyRedux + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    },
    )
      .then(response => {
        if (response.status == 200) {
          response.json().then(dataJson => {
            setData(dataJson.token);
            console.log("dataJson", dataJson);
            console.log("dataJson.token", dataJson.token);
            console.log("dataJson.id", dataJson.user.id);
            console.log("dataJson.username", dataJson.user.username);
            console.log("dataJson.email", dataJson.user.email);
            console.log("dataJson.language", dataJson.user.language);
            console.log("dataJson.about", dataJson.user.about);
            console.log("dataJson.photo", dataJson.user.photo);
            console.log("dataJson.categoryId", dataJson.user.category);
            console.log("dataJson.localTime", dataJson.user.localTime);
            console.log("dataJson.localDate", dataJson.user.localDate);
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
                    {txtLoginSuccess}
                  </Box>
                );
              },
            });
            if (dataJson.user.about == null || dataJson.user.about == undefined) {
              dispatch(SetToken(dataJson.token));
              dispatch(SetId(dataJson.user.id));
              dispatch(SetUsername(dataJson.user.username));
              dispatch(SetEmail(dataJson.user.email));
              dispatch(SetLanguage(dataJson.user.language));
              dispatch(SetTime(dataJson.user.localTime));
              dispatch(SetDate(dataJson.user.localDate));
              navigation.navigate("RegisterFinalStep");
            } else {
              dispatch(SetToken(dataJson.token));
              dispatch(SetId(dataJson.user.id));
              dispatch(SetUsername(dataJson.user.username));
              dispatch(SetEmail(dataJson.user.email));
              dispatch(SetLanguage(dataJson.user.language));
              dispatch(SetAbout(dataJson.user.about));
              dispatch(SetImagePath(dataJson.user.photo));
              dispatch(SetCategoryId(dataJson.user.category.id));
              dispatch(SetTime(dataJson.user.localTime));
              dispatch(SetDate(dataJson.user.localDate));
              navigation.navigate("TabsNavigator");
            }
          });
        } else {
          if (response.status == 401) {
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
                    {txtUsernameOrPasswordWrong}
                  </Box>
                );
              },
            });
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
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Background>
      <View style={styles.myCard1}>
        <Text style={styles.myText1}>
          {txtLogin}
        </Text>
        <View style={styles.myCard2}>
          <Text style={styles.myText2}>
            {txtWelcomeBack}
          </Text>
          <Text style={styles.myText3}>
            {txtLoginAccount}
          </Text>
          <View style={styles.informationTextInput}>
            <Icon as={Ionicons} name={"person"} color={"black"} size={5} />
          </View>
          <TextInput placeholder={txtUsername}
            style={styles.myTextInput}
            keyboardType={"username"}
            returnKeyType={"next"}
            blurOnSubmit={false}
            placeholderTextColor={'red'}
            maxLength={maxLengthUsername}
            onChangeText={(text) => {
              setUsername(text);
            }}
            onSubmitEditing={() => {
              textInputRef.current && textInputRef.current.focus();
            }}
          ></TextInput>
          <View style={styles.informationTextInput}>
            <Icon as={Entypo} name={"lock"} color={"black"} size={5} />
          </View>
          <TextInput placeholder={txtPassword}
            style={styles.myTextInput}
            secureTextEntry={true}
            returnKeyType={"done"}
            ref={textInputRef}
            placeholderTextColor={'red'}
            maxLength={maxLengthPassword}
            onChangeText={(text) => { setPassword(text) }}
            onSubmitEditing={() => {
              Keyboard.dismiss;
              LoginRequestControl();
            }}
          ></TextInput>
          <View style={styles.myCard3}>
          </View>
          <View style={{ width: '78%' }}>
            <Button bgColor={'red'} btnLabel={txtLogin} textColor={'white'} Press={() => {
              LoginRequestControl();
            }} />
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center'
          }}>
            <Text style={styles.myText5}>
              {txtDontHaveAccount + " "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.myText6}>
                {txtSignup}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
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
  myCard3: {
    alignItems: 'flex-end',
    width: '78%',
    paddingRight: 16,
    marginBottom: 125
  },
  myText1: {
    color: 'white',
    fontSize: 64,
  },
  myText2: {
    color: 'red',
    fontSize: 35,
    fontWeight: 'bold'
  },
  myText3: {
    color: 'grey',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20
  },
  myText4: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20
  },
  myText5: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20
  },
  myText6: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20
  },
  myTextInput: {
    borderRadius: 100,
    color: 'red',
    paddingHorizontal: 10,
    width: '78%',
    backgroundColor: 'rgb(220, 220, 220)',
    marginBottom: 20,
    paddingLeft: 12
  },
  informationTextInput: {
    width: '78%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
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

export default Login;