import React, { createRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Keyboard, BackHandler } from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import {
  Center,
  FormControl,
  Select,
  CheckIcon,
  CheckCircleIcon,
  WarningIcon,
  Icon,
  useToast,
  Box
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Languages from '../../languages.json';

const Signup = () => {

  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  const { MyStore } = useSelector(state => state);

  let txtSignup = Languages.languages[MyStore.phoneLanguage].Signup.txtSignup;
  let txtUsername = Languages.languages[MyStore.phoneLanguage].Signup.txtUsername;
  let txtEmail = Languages.languages[MyStore.phoneLanguage].Signup.txtEmail;
  let txtPassword = Languages.languages[MyStore.phoneLanguage].Signup.txtPassword;
  let txtTermConditions = Languages.languages[MyStore.phoneLanguage].Signup.txtTermConditions;
  let txtAnd = Languages.languages[MyStore.phoneLanguage].Signup.txtAnd;
  let txtPolicy = Languages.languages[MyStore.phoneLanguage].Signup.txtPolicy;
  let txtAlreadyHaveAccount = Languages.languages[MyStore.phoneLanguage].Signup.txtAlreadyHaveAccount;
  let txtLogin = Languages.languages[MyStore.phoneLanguage].Signup.txtLogin;

  let txtUsernameNotAvailable = Languages.languages[MyStore.phoneLanguage].Toast.txtUsernameNotAvailable;
  let txtEmailNotAvailable = Languages.languages[MyStore.phoneLanguage].Toast.txtEmailNotAvailable;
  let txtPasswordNotAvailable = Languages.languages[MyStore.phoneLanguage].Toast.txtPasswordNotAvailable;
  let txtRegisterSuccess = Languages.languages[MyStore.phoneLanguage].Toast.txtRegisterSuccess;
  let txtSomethingWentWrong = Languages.languages[MyStore.phoneLanguage].Toast.txtSomethingWentWrong;

  const textInputRef1 = createRef();
  const textInputRef2 = createRef();

  const [username, setUsername] = useState('');
  const [isUsername, setIsUsername] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState('');
  const [emailRegex, setEmailRegex] = useState(false);
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('eng');
  const [languageName, setLanguageName] = useState('English');

  const DefaultRegister = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setLanguage('eng');
    setLanguageName('English');
  };

  const standartLengthUsername = 5;
  const standartLengthEmail = 13;
  const standartLengthPassword = 6;

  const maxLengthUsername = 12;
  const maxLengthEmail = 21;
  const maxLengthPassword = 18;

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

  const SelectButtonLanguages = () => {
    return (
      <Center>
        <FormControl style={styles.select}>
          <FormControl.Label>
            <View style={styles.informationTextInput}>
              <View style={{ width: '50%' }}>
                <Icon as={Fontisto} name={"language"} color={"black"} size={6} />
              </View>
              <View style={{ alignItems: 'flex-end', width: '78%' }}>
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

  const IsUsername = () => {
    if (username.length == 0) {
      return (
        <View>
          <Text style={styles.myText7}>
            {username.length}/{standartLengthUsername}
          </Text>
        </View>
      )
    } else if (username.length < standartLengthUsername || isUsername == false) {
      return (
        <View style={styles.lengthAndIcon}>
          <WarningIcon
            style={{ marginRight: 5 }}
            name="warning-1"
            color="error.500"
          />
          <Text style={styles.myText7}>
            {username.length}/{standartLengthUsername}
          </Text>
        </View>
      )
    } else if (username.length >= standartLengthUsername && isUsername == true) {
      return (
        <View style={styles.lengthAndIcon}>
          <CheckCircleIcon
            style={{ marginRight: 5 }}
            name="check-circle"
            color="emerald.500"
          />
          <Text style={styles.myText7}>
            {username.length}/{standartLengthUsername}
          </Text>
        </View>
      )
    }
  }

  const IsEmail = () => {
    if (email.length == 0) {
      return (
        <View>
          <Text style={styles.myText7}>
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
          <Text style={styles.myText7}>
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
          <Text style={styles.myText7}>
            {email.length}/{standartLengthEmail}
          </Text>
        </View>
      )
    }
  }

  const IsPassword = () => {
    if (password.length == 0) {
      return (
        <View>
          <Text style={styles.myText7}>
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
          <Text style={styles.myText7}>
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
          <Text style={styles.myText7}>
            {password.length}/{standartLengthPassword}
          </Text>
        </View>
      )
    }
  }

  useEffect(() => {
    if (username.length != 0) {
      fetch(MyStore.proxyRedux + '/auth/username/' + username, {
        method: 'GET',
      },
      )
        .then(response => {
          console.log(response.status);
          if (response.status == 200) {
            if (username.length >= standartLengthUsername) {
              setIsUsername(true);
            } else {
              setIsUsername(false);
            }
          } else {
            setIsUsername(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [username])

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

  const RegisterRequestControl = () => {
    if (username.length >= standartLengthUsername && isUsername == true) {
      if (email.length >= standartLengthEmail && isEmail == true && emailRegex == true) {
        if (password.length >= standartLengthPassword) {
          RegisterRequest();
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
                  {"password uygun değil"}
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
                {"email uygun değil"}
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
              {"username uygun değil"}
            </Box>
          );
        },
      });
    }
  }

  const RegisterRequest = () => {
    fetch(MyStore.proxyRedux + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        language: language,
      })
    })
      .then(response => {
        response.json().then(dataJson => {
          if (response.status == 201) {
            console.log("dataJson.id", dataJson.id);
            console.log("dataJson.username", dataJson.username);
            console.log("dataJson.email", dataJson.email);
            console.log("dataJson.language", dataJson.language);
            console.log("dataJson.about", dataJson.about);
            console.log("dataJson.photo", dataJson.photo);
            console.log("dataJson.category", dataJson.category);
            console.log("dataJson.localTime", dataJson.localTime);
            console.log("dataJson.localDate", dataJson.localDate);
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
                    {"kayit basarili!"}
                  </Box>
                );
              },
            });
            DefaultRegister();
            navigation.navigate('Promotion');
          } else {
            console.log("dataJson", dataJson);
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
                    {"birseler yanlis gitti!"}
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
    <Background>
      <View style={styles.myCard1}>
        <Text style={styles.myText1}>
          {txtSignup}
        </Text>
        <View style={styles.myCard2}>
          <View style={styles.informationTextInput}>
            <View>
              <Icon as={Ionicons} name={"person"} color={"black"} size={5} />
            </View>
            <View>
              {IsUsername()}
            </View>
          </View>
          <TextInput placeholder={txtUsername}
            style={styles.myTextInput}
            returnKeyType={"next"}
            blurOnSubmit={false}
            placeholderTextColor={'red'}
            maxLength={maxLengthUsername}
            onChangeText={(text) => {
              setUsername(text);
            }}
            onSubmitEditing={() => {
              textInputRef1.current && textInputRef1.current.focus();
            }}
          ></TextInput>
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
            ref={textInputRef1}
            keyboardType={"email-address"}
            returnKeyType={"next"}
            blurOnSubmit={false}
            placeholderTextColor={'red'}
            maxLength={maxLengthEmail}
            onChangeText={(text) => {
              setEmail(text);
              handleValidEmail(text);
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
              {IsPassword()}
            </View>
          </View>
          <TextInput placeholder={txtPassword}
            style={styles.myTextInput}
            ref={textInputRef2}
            secureTextEntry={true}
            returnKeyType={"done"}
            blurOnSubmit={false}
            placeholderTextColor={'red'}
            maxLength={maxLengthPassword}
            onChangeText={(text) => {
              setPassword(text)
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          ></TextInput>
          {SelectButtonLanguages()}
          <View style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 30,
            width: '100%',
          }}>
            <TouchableOpacity style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: '78%',
              paddingRight: 16
            }} onPress={() => { navigation.navigate("Policy"); }}>
              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>
                {txtTermConditions}
              </Text>
              <Text style={{ color: 'grey', fontSize: 16 }}>
                {" "}{txtAnd}{" "}
              </Text>
              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>
                {txtPolicy}
              </Text>
            </TouchableOpacity>
            <View style={{ width: '78%' }}>
              <Button bgColor={'red'} btnLabel={txtSignup} textColor={'white'} Press={() => {
                RegisterRequestControl();
              }} />
            </View>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={styles.myText5}>
                {txtAlreadyHaveAccount + " "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.myText6}>
                  {txtLogin}
                </Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 75,
    marginVertical: 10,
    alignItems: 'center',
  },
  myCard3: {
    alignItems: 'flex-end',
    width: '78%',
    paddingRight: 16
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
  myText3: {
    color: 'white',
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
  myText7: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  myTextInput: {
    borderRadius: 100,
    color: 'red',
    paddingHorizontal: 10,
    width: '78%',
    backgroundColor: 'rgb(220, 220, 220)',
    marginBottom: 15,
    paddingLeft: 12
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
  }
})

export default Signup;