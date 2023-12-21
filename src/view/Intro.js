import React from 'react'
import {View, Text, Image, StyleSheet, StatusBar,Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Icon } from "native-base";
import AppIntroSlider from 'react-native-app-intro-slider';
import {API_NAME} from "@env"
import * as Animatable from 'react-native-animatable';


const data = [
    {
      title: "CANCHA 1 FUTBOL",
      text: 'La Cancha 1 de fútbol ⚽ tiene dimensiones de 19x32 metros con césped natural 🌱, y se requiere el uso de zapatos micros o pupillos 👟.',
      image: require('../public/img/1.png'),
      bg: '#43A047',
    },
    {
      title: 'CANCHA 2 FUTBOL',
      text: 'La Cancha 2 de fútbol ⚽ tiene dimensiones de 16x32 metros con césped natural 🌱, y se requiere el uso de zapatos micros o pupillos 👟.',
      image: require('../public/img/2.png'),
      bg: '#9E9D24',
    },
    {
      title: 'CANCHA DE VOLLEY',
      text: "La Cancha de Volley 🏐 tiene dimensiones de 13x20 metros y está hecha de tierra. 🌿",
      image: require('../public/img/3.png'),
      bg: '#34d399',
    },
    {
      title: 'RECEPCIONES',
      text: "Capacidad para 80 personas, con baños 🚽, cocina 🍽️, áreas verdes 🌳 y canchas deportivas 🏀. Perfecto para eventos especiales.",
      image: require('../public/img/4.png'),
      bg: '#F57F17',
    }
  ];

  const { width, height } = Dimensions.get('window');



  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        width: (width*0.50)/1, 
        height: (width*0.50)/1 ,
        marginVertical: 52,
    },
    text: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      color: 'white',
      textAlign: 'center',
      fontWeight:'bold'
    },
    buttonCircle: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default function Intro({navigation}) {


    const _renderItem = ({item}: {item: Item}) => {
        return (
          <View
            style={[
              styles.slide,
              {
                backgroundColor: item.bg,
              },
            ]}>
            <Animatable.Text animation="pulse"  iterationCount="infinite" style={styles.title}>{item.title}</Animatable.Text>
            <Animatable.Image animation="swing" easing="ease-out"  source={item.image} style={styles.image} ></Animatable.Image>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      };
    
      const _keyExtractor = (item: Item) => item.title;
    
      const _renderNextButton = () => {
        return (
          <Animatable.View animation={"zoomIn"} iterationCount="infinite" style={styles.buttonCircle}>
            <Icon
             as={<MaterialIcons name={"arrow-forward"} />}
              color="rgba(255, 255, 255, .9)"
            />
          </Animatable.View>
        );
      };


  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon as={<MaterialIcons name={"done"} />} color="rgba(255, 255, 255, .9)" />
      </View>
    );
  };


  return (
    <View style={{flex: 1}}>
    <StatusBar translucent backgroundColor="transparent" />
    <AppIntroSlider
      keyExtractor={_keyExtractor}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderItem={_renderItem}
      data={data}
      onDone={()=>navigation.navigate('Login')}
    />
  </View>
  )
}
