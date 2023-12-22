import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioReserva from '../reservas/InicioReserva';
import DetalleReserva from '../reservas/DetalleReserva';

const CombustibleStack = createNativeStackNavigator();

export default function ReservaStackScreen() {
    return (
        <CombustibleStack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: '#f97316',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
            <CombustibleStack.Screen name="InicioReserva" component={InicioReserva} options={{ title:'Reservas' }}/>
            <CombustibleStack.Screen name="DetalleReserva" component={DetalleReserva} options={{ title:'Detalle reserva' }}/>
            
        </CombustibleStack.Navigator>
    )
}
