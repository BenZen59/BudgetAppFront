import { Accueil } from '@/components/Accueil/Accueil';
import { Comptes } from '@/components/Comptes/Comptes';
import { MaterialIcons } from '@expo/vector-icons'; // Si tu veux des icônes
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Accueil'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#006F47',
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#006F47',
          width: 240,
        },
        drawerActiveTintColor: '#FFD700', // or
        drawerInactiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name='Accueil'
        component={Accueil}
        options={{
          headerTitle: 'Mon Accueil', // titre spécifique pour cet écran
          drawerIcon: ({ color }) => (
            <MaterialIcons name='home' size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Comptes'
        component={Comptes}
        options={{
          headerTitle: 'Gestion des Comptes',
          drawerIcon: ({ color }) => (
            <MaterialIcons name='account-balance' size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
