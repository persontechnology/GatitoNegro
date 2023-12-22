
import React,{useContext, useEffect, useState} from 'react'
import {ActivityIndicator,FlatList, RefreshControl} from 'react-native';
import { AuthContext } from '../../service/AuthContext';
import { Icon,Pressable, Text,useToast, Box, HStack, Heading, Flex, Center, Spacer,Badge,VStack,ScrollView,Image,useDisclose,Actionsheet } from 'native-base';
import {API_URL} from "@env";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';



export default function InicioReserva({navigation}) {
  const {userToken,userId}=useContext(AuthContext);
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const toast = useToast();

  const getListadoReservas = async () => {
    try {
      const response = await fetch(API_URL+'listar-reservas-solicitados',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
            userId
        })
      });
      const json = await response.json();
      console.log(json)

      setdata(json.servicios);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListadoReservas();
  
  }, []);

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();


  var [idReservaGloba, setidReservaGloba] = useState('');

  function abrirAction(id){
    onOpen()
    setidReservaGloba(id)
  }

  const confirmarReserva = async (estado) => {
    setLoading(true);
    try {
        const response = await fetch(API_URL+'reservar-rechazar-reserva',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({
              'id':idReservaGloba,
              'estado':estado
          })
        });
        const data=await response.json();
        
        if(data.errors){
            Object.entries(data.errors).forEach(([key, value]) => {
                toast.show({'description':value.toString()})
            });
        }
        if(data.message==='ok'){
            toast.show({'description':data.descripcion})
            getListadoReservas();
            onClose()
        }
        
        
      } catch (error) {
        toast.show({'description':error.toString()})
      } finally {
        setLoading(false);
      }
  };


  



  function Example() {
    return <Center>
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text fontSize="16" color="gray.500" _dark={{
          color: "gray.300"
        }}>
            Confirmar reserva
          </Text>
        </Box>
        <Actionsheet.Item onPress={()=>confirmarReserva("RESERVADO")} startIcon={<Icon as={MaterialIcons} size="6" name="check" />}>
          Reservar
        </Actionsheet.Item>
        <Actionsheet.Item onPress={()=>confirmarReserva("RECHAZADO")} startIcon={<Icon as={MaterialIcons} name="close" size="6" />}>
          Rechazar
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  </Center>;
  }




  return (
    
    <ScrollView refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={getListadoReservas} />
    }>
      <Center mt="2" mb="2">
        <Heading fontSize="xl">LISTADO DE RESERVAS SOLICITADOS</Heading>
      </Center>
     
     
      {
        isLoading ?(
          <ActivityIndicator/>
        ):(

          data.map((servicio)=>{
            return (
              <Center flex={1} px={2} py={2} key={servicio.id}>
                <Box alignItems="center">
                  <Pressable maxW="96" onPress={()=>abrirAction(servicio.id)} >
                    {({
                    isHovered,
                    isFocused,
                    isPressed
                  }) => {
                    return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
                      transform: [{
                        scale: isPressed ? 0.96 : 1
                      }]
                    }} px="5"   rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                          
                          <HStack>
                          <Flex>
                          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                            CANCHA A
                          </Text>
                                
                            </Flex>
                          <Spacer></Spacer>
                          <VStack>
                          <Image key={servicio.id} mt={"2"} size={"sm"} resizeMode="cover" source={{uri: servicio.foto_1}} alt={"Alternate Text "} />
                          </VStack>
                        </HStack>
                          <Text color="coolGray.800" mt="1" fontWeight="medium" fontSize="xl">
                            Cliente
                          </Text>
                          <Text mt="2" fontSize="sm" color="coolGray.700">
                            {
                                "Cliente: "+servicio.cliente+"\n"+
                                "Email: "+servicio.email+"\n"+
                                "C.i: "+servicio.identificacion+"\n"+
                                "Tlf: "+servicio.telefono+"\n"+
                                "Dir."+servicio.direccion
                            }
                          </Text>
                          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                            Detalle
                          </Text>
                          <Text mt="2" fontSize={12} fontWeight="normal">
                                  {
                                    "Precio: $"+servicio.precio+"\n"+
                                    "Horas: "+servicio.cantidad_horas+"\n"+
                                    "Fecha inicio: "+servicio.fecha_inicio+"\n"+
                                    "Fecha final: "+servicio.fecha_final+"\n"+
                                    
                                    "Detalle: "+servicio.detalle_cliente+"\n"
                                  }
                        </Text>
                        <HStack alignItems="center" mb="2">
                            <Badge colorScheme="green" _text={{
                          color: "white"
                        }} variant="solid" rounded="4">
                              {'TOTAL: $'+servicio.precio*servicio.cantidad_horas}
                            </Badge>
                            
                            <Spacer />
                            <Text fontSize={10} color="coolGray.800">
                              {'Fecha: '+servicio.fecha_inicio}
                            </Text>
                          </HStack>
                        
                          
                        </Box>;
                  }}
                  </Pressable>
                  <Example />
                </Box>
              </Center>
            )
          })
          
        )
      }

      

  </ScrollView> 

  )
}
