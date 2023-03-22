import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/Background';
import { Box, FlatList } from 'native-base';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import Languages from '../../languages.json';

const Policy = () => {

    const navigation = useNavigation();

    const { MyStore } = useSelector(state => state);

    let txtPolicy = Languages.languages[MyStore.phoneLanguage].Policy.txtPolicy;
    let txtOutPolicy = Languages.languages[MyStore.phoneLanguage].Policy.txtOutPolicy;
    let txtTurnBack = Languages.languages[MyStore.phoneLanguage].Policy.txtTurnBack;

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

    const terms = [{
        id: "1",
        text: "1"
    },
    {
        id: "2",
        text: "2"
    }]

    return (
        <Background>
            <View style={styles.myCard1}>
                <Text style={styles.myText1}>
                    {txtPolicy}
                </Text>
            </View>
            <View style={styles.myCard2}>
                <Text style={styles.myText2}>
                    {txtOutPolicy}
                </Text>
                <Box style={styles.myCard3}>
                    <FlatList data={terms} renderItem={({
                        item
                    }) => <Box style={styles.myList}>
                            <Text style={styles.myText3}>
                                {item.id}
                            </Text>
                            <Text style={styles.myText3}>
                                {"-) "}
                            </Text>
                            <Text style={styles.myText3}>
                                {item.text}
                            </Text>
                        </Box>} keyExtractor={item => item.id} />
                </Box>
                <View style={{
                    width: '78%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 70
                }}>
                    <Button bgColor={'red'} btnLabel={txtTurnBack} textColor={'white'} Press={() => {
                        navigation.goBack();
                    }} />
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
        marginBottom: 20,
        marginTop: 50
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
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    myList: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row'
    }
})

export default Policy;