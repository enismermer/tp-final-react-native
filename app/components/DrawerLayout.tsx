// // components/DrawerLayout.tsx
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import { Button, Text, View } from 'react-native';

// const Drawer = createDrawerNavigator();

// export default function DrawerLayout() {
//   const router = useRouter();

//   const logout = async () => {
//     await AsyncStorage.removeItem("token");
//     router.replace("/login");
//   };

//   return (
//     <NavigationContainer independant>
//       <Drawer.Navigator initialRouteName="Accueil">
//         <Drawer.Screen
//           name="Se déconnecter"
//           component={() => (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//               <Text style={{ fontSize: 18, marginBottom: 20 }}>Voulez-vous vous déconnecter ?</Text>
//               <Button title="Oui, me déconnecter" onPress={logout} />
//             </View>
//           )}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
