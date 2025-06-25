import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HistoryScreen from './history'; // onglet 2
import BatteryScreen from './index'; // onglet 1

const Tab = createBottomTabNavigator();

export default function DashboardLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Battery" component={BatteryScreen} options={{ title: 'Batterie' }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Historique' }} />
    </Tab.Navigator>
  );
}
