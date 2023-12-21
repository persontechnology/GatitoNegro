
import React,{useContext, useEffect, useState} from 'react'
import {ActivityIndicator,FlatList} from 'react-native';
import { AuthContext } from '../service/AuthContext';
import { Pressable, Text, Box, HStack, Heading, Flex, Center, Spacer,Badge,VStack,ScrollView,Image } from 'native-base';
import {API_URL} from "@env";
export default function Inicio({navigation}) {
  const {userRolesPermisos,userToken}=useContext(AuthContext);
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);

  console.log(API_URL)

  const getMovies = async () => {
    try {
      const response = await fetch(API_URL+'listado-reservas');
      const json = await response.json();
      console.log(json.servicios)
      setdata(json.servicios);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
    console.log(getMovies())

  }, []);





  return (
    
    <ScrollView>
      <Center mt="3" mb="4">
        <Heading fontSize="xl">SERVICIOS</Heading>
      </Center>
     
     
      {
        isLoading ?(
          <ActivityIndicator/>
        ):(

          data.map((servicio)=>{
            return (
              <Center flex={1} px={2} py={2}>
                <Box alignItems="center">
                  <Pressable maxW="96" onPress={()=>navigation.navigate("ReservarServicio",servicio)} >
                    {({
                    isHovered,
                    isFocused,
                    isPressed
                  }) => {
                    return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
                      transform: [{
                        scale: isPressed ? 0.96 : 1
                      }]
                    }} p="5"   rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                          <HStack alignItems="center">
                            <Badge colorScheme="green" _text={{
                          color: "white"
                        }} variant="solid" rounded="4">
                              {'$'+servicio.precio_hora+' la hora'}
                            </Badge>
                            
                            <Spacer />
                            <Text fontSize={10} color="coolGray.800">
                              {'Capacidad para '+servicio.capacidad_personas+' personas'}
                            </Text>
                          </HStack>
                          
                          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                            {servicio.nombre}
                          </Text>
                          <Text mt="2" fontSize="sm" color="coolGray.700">
                            {servicio.detalle}
                          </Text>
                        <HStack>
                          <Flex>
                              {isFocused ? <Text mt="2" fontSize={12} fontWeight="medium" textDecorationLine="underline" color="green.600" alignSelf="flex-start">
                                  Reservar
                                </Text> : <Text mt="2" fontSize={12} fontWeight="medium" color="green.600">
                                  Reservar
                                </Text>}
                                
                            </Flex>
                          <Spacer></Spacer>
                          <VStack>
                          <Image key={servicio.id} size={"sm"} resizeMode="cover" source={{uri: servicio.foto_1}} alt={"Alternate Text "} />
                          </VStack>
                        </HStack>
                          
                        </Box>;
                  }}
                  </Pressable>
                </Box>
              </Center>
            )
          })
          
        )
      }

      

  </ScrollView> 

  )
}
