import React,{useContext,useEffect,useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Entypo from 'react-native-vector-icons/Entypo';
import  Ionicons from 'react-native-vector-icons/Ionicons';
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Icon } from 'native-base';
import { AuthContext } from '../service/AuthContext';
import HomeStackScreen from './Stack/HomeStackScreen';
import MisReservasStackScreen from './Stack/MisReservasStackScreen';
import ReservaStackScreen from './Stack/ReservaStackScreen';


const Tab = createBottomTabNavigator();

export default function HomeTab() {
  const {userRolesPermisos,userToken}=useContext(AuthContext);

  
  return (
    
      <Tab.Navigator screenOptions={{ headerShown: false,tabBarActiveTintColor:"#2E7D32" }}>

        <Tab.Screen name="TabHome" component={HomeStackScreen}  options={{
          tabBarLabel: 'Inicio',
          
          tabBarIcon: ({ color, size }) => (
            <Icon as={Entypo} name="home" color={color} size={size} />
          ),
        }} />
        
        {
          userRolesPermisos.includes("ADMIN") ?(
            <Tab.Screen name="TabReserva" component={ReservaStackScreen} options={{
              tabBarLabel: 'Reservas',
              tabBarIcon: ({ color, size }) => (
                <Icon as={MaterialCommunityIcons} name="cart" color={color} size={size} />
              ),
            }} />
            
          ):<></>
        }


        <Tab.Screen name="TabMisReservas" component={MisReservasStackScreen} options={{
          tabBarLabel: 'Mis reservas',
          tabBarIcon: ({ color, size }) => (
            <Icon as={MaterialCommunityIcons} name="cart-heart" color={color} size={size} />
          ),
        }} />
            


      </Tab.Navigator>
    
  );
}
