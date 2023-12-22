
import React,{useContext,useState} from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center,useToast,Icon, View,ScrollView } from "native-base";
import { API_NAME } from "@env"
import {AuthContext} from '../../service/AuthContext'
import {API_URL} from "@env";
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';


export default function Registrar({navigation}) {


    const [apellidos, setapellidos] = useState('');
    const [nombres, setnombres] = useState('');
    const [identificacion, setidentificacion] = useState('');
    const [telefono, settelefono] = useState('');
    const [direccion, setdireccion] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    
    const [verPassword, setverPassword] = useState(false);
    const [verPassword2, setverPassword2] = useState(false);
    const [cargando, setcargando] = useState(false);

    const toast = useToast();
    const { signIn } = useContext(AuthContext);


    const  acceder= async()=>{
        setcargando(true);
        try {
            const res=await fetch(API_URL+"registro",{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "apellidos":apellidos,
                    "nombres":nombres,
                    "identificacion":identificacion,
                    'telefono':telefono,
                    'direccion':direccion,
                    "email":username,
                    "password":password,
                    "password_confirmation":password2
                })
            });
            const data=await res.json();
            console.log(data)
            if(data.errors){
                Object.entries(data.errors).forEach(([key, value]) => {
                    toast.show({'description':value.toString()})
                });
            }
            if(data.message==='ok'){
                signIn(data);
            }

        } catch (error) {
            toast.show({'description':error.toString()})
        }finally {
            setcargando(false);
        }
    }

    return (
        <ScrollView>
            <Center w="100%" flex={1} px={3}>
                <Animatable.View animation="zoomInUp" easing="ease-out" >
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }}>
                            Crear cuenta gratis
                        </Heading>
                        <Heading mt="1" _dark={{
                            color: "warmGray.200"
                        }} color="coolGray.600" fontWeight="medium" size="xs">
                            Complete todos los datos porfavor.
                        </Heading>
                        
                        <VStack space={3} mt="5">
                            

                            <FormControl isRequired>
                                <FormControl.Label>Apellidos</FormControl.Label>
                                <Input  value={apellidos} 
                                onChangeText={setapellidos} keyboardType="default" />
                            </FormControl>

                            <FormControl isRequired>
                                <FormControl.Label>Nombres</FormControl.Label>
                                <Input  value={nombres} 
                                onChangeText={setnombres} keyboardType="default" />
                            </FormControl>

                            <FormControl isRequired>
                                <FormControl.Label>Identificación</FormControl.Label>
                                <Input  value={identificacion} 
                                onChangeText={setidentificacion} keyboardType="numeric" />
                            </FormControl>

                            <FormControl isRequired>
                                <FormControl.Label>Teléfono</FormControl.Label>
                                <Input  value={telefono} 
                                onChangeText={settelefono} keyboardType="phone-pad" />
                            </FormControl>

                            <FormControl isRequired>
                                <FormControl.Label>Dirección</FormControl.Label>
                                <Input  value={direccion} 
                                onChangeText={setdireccion} keyboardType="default" />
                            </FormControl>
                            

                            <FormControl isRequired>
                                <FormControl.Label>Email</FormControl.Label>
                                <Input  value={username} 
                                onChangeText={setUsername} keyboardType="email-address" />
                            </FormControl>

                            <FormControl isRequired>
                                <FormControl.Label>Contraseña</FormControl.Label>
                                <Input type={verPassword?'text':'password'} 
                                onChangeText={setPassword} 
                                value={password} 
                                InputRightElement={<Icon as={<MaterialIcons name={verPassword?'visibility-off':'visibility'} />} onPress={()=>setverPassword(!verPassword)}  mr="2" color="muted.400" />}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormControl.Label>Confirmar contraseña</FormControl.Label>
                                <Input type={verPassword2?'text':'password'} 
                                onChangeText={setPassword2} 
                                value={password2} 
                                InputRightElement={<Icon as={<MaterialIcons name={verPassword2?'visibility-off':'visibility'} />} onPress={()=>setverPassword2(!verPassword2)}  mr="2" color="muted.400" />}
                                />
                            </FormControl>


                            <Button mt="2" colorScheme="success" isLoading={cargando} onPress={acceder}>
                                Crear cuenta
                            </Button>
                            <View style={{ alignContent:'center', alignItems:'center' }}><Text>o</Text></View>
                            <Button mt="0" variant={'outline'} onPress={()=>navigation.goBack()} colorScheme="danger">
                                Cancelar
                            </Button>
                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }}>
                                    {API_NAME + " © " + new Date().getFullYear() + "."}
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                </Animatable.View>
            </Center>
        </ScrollView>

    );
};
