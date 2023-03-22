import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import Create from './Create';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'native-base';
import { BackHandler, View, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import Languages from '../../languages.json';
import RNExitApp from 'react-native-exit-app';

const TabsNavigator = () => {
    const Tabs = createBottomTabNavigator();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { MyStore } = useSelector(state => state);

    let txtHome = Languages.languages[MyStore.languageRedux].TabsNavigator.txtHome;
    let txtSearch = Languages.languages[MyStore.languageRedux].TabsNavigator.txtSearch;
    let txtCreate = Languages.languages[MyStore.languageRedux].TabsNavigator.txtCreate;
    let txtProfile = Languages.languages[MyStore.languageRedux].TabsNavigator.txtProfile;

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

    useEffect(() => {
        navigation.navigate("Home");
    }, [])

    return (
        <Tabs.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: txtHome,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: '#FF0000',
                    unmountOnBlur: true,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon as={MaterialIcon} name="home" color={focused ? '#FF0000' : 'black'} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: txtSearch,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: '#FF0000',
                    unmountOnBlur: true,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon as={MaterialIcon} name="search" color={focused ? '#FF0000' : 'black'} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Create"
                component={Create}
                options={{
                    tabBarLabel: txtCreate,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: '#FF0000',
                    unmountOnBlur: true,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon as={MaterialIcon} name="create" color={focused ? '#FF0000' : 'black'} size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: txtProfile,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: '#FF0000',
                    unmountOnBlur: true,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Icon as={MaterialIcon} name="person" color={focused ? '#FF0000' : 'black'} size={size} />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default TabsNavigator;