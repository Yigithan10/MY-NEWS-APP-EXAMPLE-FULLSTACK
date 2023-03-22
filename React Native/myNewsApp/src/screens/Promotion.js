import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Languages from '../../languages.json';

const Promotion = () => {

    const navigation = useNavigation();

    const { MyStore } = useSelector(state => state);

    let txtTitle1 = Languages.languages[MyStore.phoneLanguage].Promotion.txtTitle1;
    let txtText1 = Languages.languages[MyStore.phoneLanguage].Promotion.txtText1;
    let txtTitle2 = Languages.languages[MyStore.phoneLanguage].Promotion.txtTitle2;
    let txtText2 = Languages.languages[MyStore.phoneLanguage].Promotion.txtText2;
    let txtTitle3 = Languages.languages[MyStore.phoneLanguage].Promotion.txtTitle3;
    let txtText3 = Languages.languages[MyStore.phoneLanguage].Promotion.txtText3;
    let txtBack = Languages.languages[MyStore.phoneLanguage].Promotion.txtBack;
    let txtNext = Languages.languages[MyStore.phoneLanguage].Promotion.txtNext;

    const [currentStep, setCurrentStep] = useState(0)
    const [steps, setSteps] = useState([
        {
            id: 1,
            image: require("../assets/1.jpg"),
            title: txtTitle1,
            description: txtText1
        },
        {
            id: 2,
            image: require("../assets/2.jpg"),
            title: txtTitle2,
            description: txtText2
        },
        {
            id: 3,
            image: require("../assets/3.png"),
            title: txtTitle3,
            description: txtText3
        }
    ])
    const nextStep = () => {
        if (currentStep >= 2) {
            navigation.navigate("Welcome");
        } else {
            setCurrentStep(currentStep + 1);
        }
    }

    const prevStep = () => {
        setCurrentStep(currentStep <= 0 ? 0 : currentStep - 1)
    }
    return (
        <View style={styles.container}>
            <Image source={steps[currentStep].image} style={styles.stepImage} resizeMode="cover" />
            <View style={styles.stepIndicatorView}>
                {steps.map((step, index) => {
                    return (
                        <View key={step.id} style={{
                            ...styles.stepIndicator,
                            width: currentStep === index ? 40 : 30,
                            backgroundColor: currentStep === index ? "red" : "gray"
                        }}></View>
                    )
                })}
            </View>
            <Text style={styles.title}>{steps[currentStep].title}</Text>
            <Text style={styles.description}>{steps[currentStep].description}</Text>
            <View style={styles.navigationView}>
                {
                    currentStep > 0 ?
                        <TouchableOpacity
                            onPress={() => prevStep()}
                            style={{ ...styles.navigationBtn, borderTopEndRadius: 20, borderBottomEndRadius: 20, }}>
                            <Text style={styles.navigationBtnTxt}>{txtBack}</Text>
                        </TouchableOpacity>
                        :
                        <View></View>
                }

                <TouchableOpacity
                    onPress={() => nextStep()}
                    style={{ ...styles.navigationBtn, borderTopStartRadius: 20, borderBottomStartRadius: 20 }}>
                    <Text style={styles.navigationBtnTxt}>{txtNext}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepImage: {
        width: "100%",
        height: "50%",
        marginVertical: 30,
        borderRadius: 50
    },
    stepIndicatorView: {
        flexDirection: "row"
    },
    stepIndicator: {
        height: 10,
        marginHorizontal: 5,
        borderRadius: 10
    },
    title: {
        color: 'gray',
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 20,
    },
    description: {
        color: 'gray',
        textAlign: "center",
        paddingHorizontal: 10
    },
    navigationView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    navigationBtn: {
        backgroundColor: "red",
        height: 40,
        width: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    navigationBtnTxt: {
        color: "white",
        fontWeight: "bold"
    }

});

export default Promotion;