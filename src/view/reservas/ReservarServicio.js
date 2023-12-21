import { View } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import { Pressable, Text, Box, HStack, Spacer, Flex, VStack,FormControl,Input,Link,Button, Center, Image,ScrollView,Heading,AspectRatio,Stack } from "native-base";
import { AuthContext } from '../../service/AuthContext';
import {API_URL} from "@env";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function ReservarServicio({ route, navigation }) {

  
  // reserva
  const { 
    id,
    nombre,
    detalle,
    estado,
    capacidad_personas,
    dimensiones,
    precio_hora,
    foto_1,
    foto_2,
    foto_3,
    foto_4,
    tipo_reserva
   } = route.params;

  //  usuario

  const [email, setemail] = useState('');
  const [apellidos, setapellidos] = useState('');
  const [nombres, setnombres] = useState('');
  const [identificacion, setidentificacion] = useState('');
  const [telefono, settelefono] = useState('');
  const [direccion, setdireccion] = useState('');
  const {userToken,userId}=useContext(AuthContext);
  const [foto_principal, setfoto_principal] = useState(foto_1);

  // datos paar enviar
  const [fecha, setfecha] = useState('');
  const [horas, sethoras] = useState('1');
  const [detalle_txt, setdetalle_txt] = useState('');

  const  usuario= async()=>{
    // setcargando(true);
    try {
        const res=await fetch(API_URL+"obtener-usuario",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body:JSON.stringify({
                "userId":userId
            })
        });
        const data=await res.json();
        if(data){
          setemail(data.email);
          setapellidos(data.apellidos);
          setnombres(data.nombres);
          setidentificacion(data.identificacion);
          settelefono(data.telefono);
          setdireccion(data.direccion);
        }

    } catch (error) {
        console.log(error)
    }finally {
        // setcargando(false);
    }
}


  // datetime
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (fechaISO) => {
    // Crear un objeto Date con la fecha
    const fecha_formateada = new Date(fechaISO);

    // Obtener los componentes de la fecha
    const dia = fecha_formateada.getDate();
    const mes = fecha_formateada.getMonth() + 1; // Nombre del mes
    const anio = fecha_formateada.getFullYear();
    const hora = fecha_formateada.getHours();
    const minuto = fecha_formateada.getMinutes();

    // Formatear la fecha como deseado
    const fechaFormateada = `${anio}-${mes}-${dia} ${hora}:${minuto}`;
    setfecha(fechaFormateada)
    hideDatePicker();
  };

  useEffect(() => {
    usuario();
  }, []);

  return (
    <ScrollView>
      <Center flex={1} px="2">
        <Heading fontSize="xl">COMPLETE INFORMACIÓN</Heading>

        <Box alignItems="center">
            <Box maxW="96" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _web={{
            shadow: 2,
            borderWidth: 0
          }} _light={{
            backgroundColor: "gray.50"
          }}>
              <Box mb={1}>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image source={{
                  uri: foto_principal
                }} alt="image" />
                </AspectRatio>
              </Box>
              <Box>
              <HStack  space={1} justifyContent="center">
                <Center>
                  <Pressable onPress={()=>setfoto_principal(foto_1)}>
                  <Image key={"DD"} size={"md"} resizeMode="cover" source={{uri: foto_1}} alt={"FOTO 1 "} />
                  </Pressable>
                </Center>
                <Center>
                  <Pressable onPress={()=>setfoto_principal(foto_2)}>
                  <Image key={"DD"} size={"md"} resizeMode="cover" source={{uri: foto_2}} alt={"FOTO 2 "} />
                  </Pressable>
                </Center>
                <Center>
                  <Pressable onPress={()=>setfoto_principal(foto_3)}>
                  <Image key={"DD"} size={"md"} resizeMode="cover" source={{uri: foto_3}} alt={"FOTO 3"} />
                  </Pressable>
                </Center>
                <Center>
                  <Pressable onPress={()=>setfoto_principal(foto_4)}>
                  <Image key={"DD"} size={"md"} resizeMode="cover" source={{uri: foto_4}} alt={"FOTO 3"} />
                  </Pressable>
                </Center>
            </HStack>
              
              
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  
                  <Heading size="md" ml="-1">
                    {nombre}
                  </Heading>
                  <Text fontSize="xs" _light={{
                  color: "violet.500"
                }} _dark={{
                  color: "violet.400"
                }} fontWeight="500" ml="-0.5" mt="-1">
                    {'Capacidad para '+capacidad_personas+' personas'+"\n"}
                    {'$'+precio_hora+' la hora'}
                  </Text>
                </Stack>
                <Text fontWeight="400">
                  {detalle}
                </Text>
                <HStack alignItems="center" space={4} justifyContent="space-between">
                  <HStack alignItems="center">
                    <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                  }} fontWeight="400">
                      {"Dimensiones: "+dimensiones+"\n"}
                      {"Categoría: "+tipo_reserva}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
        </Box>
      </Center>
      

      <Center flex={1} px="1" my="2">
        <Center w="100%">
        <Box p="2"  w="96%" maxW="96" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _light={{
            backgroundColor: "gray.50"
          }}>
          
          <Heading  _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
            DATOS PERSONALES
          </Heading>

          <VStack space={1} mt="2">

            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input onChangeText={setemail} keyboardType='email-address' value={email}/>
            </FormControl>

            <FormControl>
              <FormControl.Label>Apellidos</FormControl.Label>
              <Input value={apellidos} onChange={setapellidos} />
            </FormControl>

            <FormControl>
              <FormControl.Label>Nombres</FormControl.Label>
              <Input value={nombres} onChange={setnombres} />
            </FormControl>
            
            <FormControl>
              <FormControl.Label>Identificación</FormControl.Label>
              <Input value={identificacion} onChange={setidentificacion} />
            </FormControl>

            <FormControl>
              <FormControl.Label>Teléfono</FormControl.Label>
              <Input value={telefono} onChange={settelefono} />
            </FormControl>

            <FormControl>
              <FormControl.Label>Dirección</FormControl.Label>
              <Input value={direccion} onChange={setdireccion} />
            </FormControl>

          </VStack>
          
        </Box>
      </Center>
      </Center>

      <Center flex={1} px="1" my="2">
        <Center w="100%">
        <Box p="2"  w="96%" maxW="96" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _light={{
            backgroundColor: "gray.50"
          }}>
          
          <Heading  _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
            DATOS DE LA RESERVA
          </Heading>

          <VStack space={1} mt="2">

            
            <FormControl>
              <FormControl.Label>Fecha y hora de inicio</FormControl.Label>
              <Button mt="2" colorScheme="info" onPress={showDatePicker}>
                {fecha?fecha:'SELECCIONAR'}
              </Button>
            </FormControl>

            <FormControl>
              <FormControl.Label>¿Cuantas horas quiere reservar?</FormControl.Label>
              <Input value={horas} keyboardType='numeric' onChange={sethoras} />
            </FormControl>

            <FormControl>
              <FormControl.Label>Detalle</FormControl.Label>
              <Input value={detalle_txt} onChange={setdetalle_txt} />
            </FormControl>
            
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              
            />

              <Button mt="2" colorScheme="success" onPress={()=>alert('ok')}>
                RESERVAR
              </Button>
          </VStack>
          
        </Box>
      </Center>
      </Center>
      
    </ScrollView>
  )
}