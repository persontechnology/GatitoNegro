import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioMisReserva from '../reservas/InicioMisReserva';


const CombustibleStack = createNativeStackNavigator();

export default function MisReservasStackScreen() {
    return (
        <CombustibleStack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: '#3B71CA',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
            <CombustibleStack.Screen name="InicioMisReservas" component={InicioMisReserva} options={{ title:'Mis Reservas' }}/>
            {/* <CombustibleStack.Screen name="DetalleReserva" component={DetalleReserva} options={{ title:'Detalle reserva' }}/> */}
            
        </CombustibleStack.Navigator>
    )
}
