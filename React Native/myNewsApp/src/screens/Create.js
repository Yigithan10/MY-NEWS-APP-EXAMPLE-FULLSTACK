import React, { useEffect, useState, useCallback, createRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  TextInput,
  Keyboard
} from 'react-native';
import { ScrollView, Avatar, Box, Icon, Menu, WarningIcon, CheckCircleIcon, useToast, Center, FormControl, Select, CheckIcon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Languages from '../../languages.json';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';

const Create = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  let phoneTime = new Date().toLocaleTimeString();
  let phoneDate = new Date().toLocaleDateString();

  const { MyStore } = useSelector(state => state);
  const toast = useToast();

  let txtCategory1 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory1;
  let txtCategory2 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory2;
  let txtCategory3 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory3;
  let txtCategory4 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory4;
  let txtCategory5 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory5;
  let txtCategory6 = Languages.languages[MyStore.languageRedux].SignupFinal.txtCategory6;

  let txtCreateNews = Languages.languages[MyStore.languageRedux].Create.txtCreateNews;
  let txtCreateNewsTitle = Languages.languages[MyStore.languageRedux].Create.txtCreateNewsTitle;
  let txtCreateNewsText = Languages.languages[MyStore.languageRedux].Create.txtCreateNewsText;
  let txtCreateNewsTitleNo = Languages.languages[MyStore.languageRedux].Create.txtCreateNewsTitleNo;
  let txtCreateNewsTextNo = Languages.languages[MyStore.languageRedux].Create.txtCreateNewsTextNo;
  let txtCreateNewsBtn = Languages.languages[MyStore.languageRedux].Create.txtCreateNewsBtn;
  let txtCreateNewsAlertOk = Languages.languages[MyStore.languageRedux].Create.txtCreateNewsAlertOk;
  let txtCreateNewsAlertNo = Languages.languages[MyStore.languageRedux].Create.txtCreateNewsAlertNo;

  const [isSpinner, setIsSpinner] = useState(false);

  const [categoryId, setCategoryId] = useState(2);
  const [category, setCategory] = useState(txtCategory2);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsText, setNewsText] = useState('');

  let maxLengthTitle = 35;
  let maxLengthText = 45;

  const textInputRef1 = createRef();

  function capitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }

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

  const NewsCategory = () => {
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
  }

  useEffect(() => {
    NewsCategory();
  }, [])

  const SelectButtonCategories = () => {
    return (
      <Center>
        <FormControl style={styles.select}>
          <FormControl.Label>
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

  const ControlRequest = () => {
    if (newsTitle.length != 0) {
      if (newsText.length != 0) {
        CreateNewsRequest();
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
                {txtCreateNewsTextNo}
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
              {txtCreateNewsTitleNo}
            </Box>
          );
        },
      });
    }
  }

  const CreateNewsRequest = () => {
    setIsSpinner(true);
    fetch(MyStore.proxyRedux + '/news', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + MyStore.tokenRedux,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: MyStore.idRedux,
        categoryId: categoryId,
        title: newsTitle,
        text: newsText,
      }),
    })
      .then(response => {
        if (response.status == 201) {
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
                  {txtCreateNewsAlertOk}
                </Box>
              );
            },
          });
          setNewsTitle('');
          setNewsText('');
          setIsSpinner(false);
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
                  {txtCreateNewsAlertNo}
                </Box>
              );
            },
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const CreateNewsOrSpinner = () => {
    if (isSpinner == false) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.myTextHeader}>
              {txtCreateNews}
            </Text>
          </View>
          <View style={styles.newsCardMidBorder}></View>
          <View style={styles.news}>
            <View style={styles.newsCard}>
              <View style={styles.newsCardFlex}>
                <View style={styles.newsCardCategory}>
                  <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                    <Icon as={MaterialIcon} name={"category"} color={"black"} size={5} style={{ margin: 5 }} />
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    {SelectButtonCategories()}
                  </View>
                  <TouchableOpacity disabled={true}>
                    <Menu w="125" trigger={triggerProps => {
                      return (
                        <TouchableOpacity disabled={true}>
                          <Icon as={Entypo} name={"dots-three-vertical"} color={"black"} size={5} style={{ margin: 5 }} />
                        </TouchableOpacity>
                      );
                    }}>
                      <Menu.Item>
                        <Icon as={MaterialCommunityIcons} name={"cookie-edit"} color={"black"} size={5} />
                        <Text style={styles.newsCardTextText}>düzenle</Text>
                      </Menu.Item>
                      <Menu.Item>
                        <Icon as={MaterialCommunityIcons} name={"delete"} color={"black"} size={5} />
                        <Text style={styles.newsCardTextText}>sil</Text>
                      </Menu.Item>
                    </Menu>
                  </TouchableOpacity>
                </View>
                <View style={styles.newsCardUp}>
                  <TouchableOpacity disabled={true} style={styles.newsCardAvatar}>
                    <Avatar
                      style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderWidth: 0.5 }}
                      size="40px"
                      source={{ uri: MyStore.imagePathRedux }}>
                    </Avatar>
                    <Text style={styles.newsCardTextUsername}>{capitalize(MyStore.usernameRedux)}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.newsCardMid}>
                  <TextInput placeholder={txtCreateNewsTitle}
                    style={styles.myTextInput}
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    placeholderTextColor={'red'}
                    maxLength={maxLengthTitle}
                    onChangeText={(text) => {
                      setNewsTitle(text);
                    }}
                    onSubmitEditing={() => {
                      textInputRef1.current && textInputRef1.current.focus();
                    }}
                  ></TextInput>
                  <TextInput placeholder={txtCreateNewsText}
                    style={styles.myTextInput}
                    ref={textInputRef1}
                    returnKeyType={"done"}
                    blurOnSubmit={false}
                    placeholderTextColor={'red'}
                    maxLength={maxLengthText}
                    onChangeText={(text) => {
                      setNewsText(text);
                    }}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      ControlRequest();
                    }}
                  ></TextInput>
                </View>
                <View style={styles.newsCardDown}>
                  <View style={styles.newsCardLike}>
                    <TouchableOpacity disabled={true}>
                      <Icon as={AntDesign} name="heart" color={'black'} size={5} style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.newsCardTextLike}>{'0'}</Text>
                    </View>
                  </View>
                  <View style={styles.newsCardComment}>
                    <TouchableOpacity disabled={true}>
                      <Icon as={FontAwesome} name="comment" color={'black'} size={5} />
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.newsCardTextComment}>{'0'}</Text>
                    </View>
                  </View>
                  <View style={styles.newsCardDate}>
                    <Text style={styles.newsCardTextDate}>{phoneTime[0] + phoneTime[1] + ":" + phoneTime[3] + phoneTime[4]}</Text>
                    <Text style={styles.newsCardTextDate}>{phoneDate[3] + phoneDate[4] + "-" + phoneDate[0] + phoneDate[1] + "-" + phoneDate[6] + phoneDate[7]}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button bgColor={'red'} btnLabel={txtCreateNewsBtn} textColor={'white'} Press={() => {
              ControlRequest();
            }} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
  }

  return (
    <SafeAreaView style={styles.background}>
      {CreateNewsOrSpinner()}
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
  header: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  news: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    width: '78%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  newsCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.95,
    borderWidth: 0.25,
    borderRadius: 25,
    borderColor: 'black',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  textUsername: {
    color: 'black',
    fontSize: 19,
    fontWeight: '500'
  },
  textAbout: {
    color: 'black',
    fontSize: 16,
    margin: 5
  },
  newsCardFlex: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  newsCardCategory: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10
  },
  newsCardUp: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10
  },
  newsCardAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  newsCardMid: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: 10
  },
  newsCardDown: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10
  },
  newsCardLike: {
    width: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  newsCardComment: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  newsCardDate: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  newsCardTextCategory: {
    margin: 5,
    color: 'black',
    fontSize: 16,
  },
  newsCardTextUsername: {
    margin: 5,
    color: 'black',
    fontSize: 16,
  },
  newsCardTextTitle: {
    margin: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  newsCardTextText: {
    margin: 5,
    color: 'black',
    fontSize: 14,
  },
  newsCardTextLike: {
    margin: 5,
    color: 'black',
    fontSize: 14,
  },
  newsCardTextComment: {
    margin: 5,
    color: 'black',
    fontSize: 14,
  },
  newsCardTextDate: {
    marginRight: 5,
    color: 'black',
    fontSize: 11,
  },
  myTextHeader: {
    color: 'red',
    fontWeight: '500',
    fontSize: 33,
    margin: 5
  },
  myTextInput: {
    borderRadius: 100,
    color: 'red',
    paddingHorizontal: 10,
    width: '100%',
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
  alertBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  toastAlert: {
    marginLeft: 5,
    marginRight: 5
  },
  newsCardMidBorder: {
    width: '100%',
    borderWidth: 0.6,
    borderColor: 'black'
  },
});

export default Create;
