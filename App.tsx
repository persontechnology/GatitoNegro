
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from './src/view/Intro';
import { NativeBaseProvider,StatusBar} from "native-base";
import Login from './src/view/auth/Login';
import {AuthContext} from './src/service/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cargando from './src/view/Cargando';
import HomeTab from './src/view/HomeTab';
import RestablecerContrasena from './src/view/auth/RestablecerContrasena';
import Registrar from './src/view/auth/Registrar';


const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
             // extra
             userName:action.name,
             userId:action.id,
             userEmail:action.email,
             userRolesPermisos:action.roles_permisos
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
              // extra
              userName:action.name,
              userId:action.id,
              userEmail:action.email,
              userRolesPermisos:action.roles_permisos
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            // extra
            userName:null,
            userId:null,
            userEmail:null,
            userRolesPermisos:null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
       // extra
       userName:null,
       userId:null,
       userEmail:null,
       userRolesPermisos:null
    }
  );

  React.useEffect(() => {
    
    const bootstrapAsync = async () => {
      let userToken;

      // extra
      let userName;
      let userId;
      let userEmail;
      let userRolesPermisos;

      try {
        

        userToken = await AsyncStorage.getItem('userToken');
        userName = await AsyncStorage.getItem('userName');
        userEmail = await AsyncStorage.getItem('userEmail');
        userId = await AsyncStorage.getItem('userId');
        userRolesPermisos=await AsyncStorage.getItem('userRolesPermisos');

        

      } catch (e) {
        
      }

      dispatch({ 
        type: 'RESTORE_TOKEN', 
        token: userToken,
        // extra
        name:userName,
        email:userEmail,
        id:userId,
        roles_permisos:userRolesPermisos
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
       
   

        // extra
        let userToken=data.token;
        let userName=data.user.name;
        let userId=String(data.user.id);
        let userEmail=data.user.email;
        let userRolesPermisos=JSON.stringify(data.roles_permisos);
        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userEmail', userEmail);
          await AsyncStorage.setItem('userName', userName);
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('userRolesPermisos',userRolesPermisos);
          
        } catch (error) {
          console.log(error);
        }

        dispatch({ 
          type: 'SIGN_IN', 
          token: userToken,
          email:userEmail,
          name:userName,
          id:userId,
          roles_permisos:userRolesPermisos
         });
        
      },
      signOut: async() => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userRolesPermisos');
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ ...state,...authContext }}>
       <NativeBaseProvider>
       <StatusBar translucent backgroundColor="transparent" />
        <NavigationContainer>
          
            {state.isLoading ? (
              // Aún no hemos terminado de buscar el token.
              <Stack.Navigator screenOptions={{ 
                headerShown:false
               }}>
                <Stack.Screen name="Splash" component={Cargando} />
              </Stack.Navigator>
            ) : state.userToken == null ? (
              // No se encontró ningún token, el usuario no ha iniciado sesión
              <Stack.Navigator screenOptions={{
                headerStyle: {
                  backgroundColor: '#2E7D32',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
                
                <Stack.Screen
                  name="Intro"
                  component={Intro}
                  options={{
                    title: 'CENTRO RECREACIONAL GATITO NEGRO',
                    headerShown:false,
                    // Al cerrar sesión, una animación emergente resulta intuitiva
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    title: 'Ingresar',
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name="RestablecerContrasena"
                  component={RestablecerContrasena}
                  options={{
                    title: 'Restablecer contraseña',
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />

                <Stack.Screen 
                name='Registrar'
                component={Registrar}
                options={{ 
                  title:'Registrar gratis',
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                 }}
                />
               </Stack.Navigator>
            ) : (
              // El usuario ha iniciado sesión
              <HomeTab/>
            )}
          
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
}