import ShareButton from '@/components/ShareButton';
import { Trip, TripContext } from '@/components/TripProvider';
import { db } from '@/firebase.js';
import { Stack, Tabs, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, Icon, IconButton, PaperProvider, Portal, useTheme } from 'react-native-paper';
import { withLayoutContext } from "expo-router";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { TabNavigationState, ParamListBase } from '@react-navigation/native';

export default function TabLayout() {
  const theme = useTheme();

  const fontObject = {
    fontFamily: theme.fonts.default.fontFamily,
    fontWeight: theme.fonts.default.fontWeight
  }

  const [trip, setTrip] = useState<Trip|undefined>(undefined);
  const [dialogVisible, setDialogVisible] = useState(false);

  const { id } = useLocalSearchParams<{ id: string }>();

  async function fetchTrip() {
    const trip = (await getDoc(doc(db, "events", id)) as any).data();
    setTrip({id, title: trip.eventTitle, description: trip.description});
  }

  useEffect(() => {
    fetchTrip().catch(console.error);
}, [id]);

  const MaterialTopTabs = createMaterialTopTabNavigator();
  const ExpoRouterMaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof MaterialTopTabs.Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
  >(MaterialTopTabs.Navigator);

  return (
      <>
        <Stack.Screen options={{ title: trip?.title ?? "Event Details", headerRight: () => <ShareButton /> }} />
        <TripContext.Provider value={trip}>
          <ExpoRouterMaterialTopTabs tabBarPosition='bottom'>
            <ExpoRouterMaterialTopTabs.Screen name='index' options={{
              tabBarShowLabel: false,
              tabBarIcon: ({color, size}) => <Icon source="home" size={size} color={color}/>,
              tabBarLabelStyle: fontObject,
            }}/>
            <ExpoRouterMaterialTopTabs.Screen name='ideas' options={{
              tabBarShowLabel: false,
              tabBarIcon: ({color, size}) => <Icon source="head-flash" size={size} color={color}/>,
              tabBarLabelStyle: fontObject,
            }}/>
            <ExpoRouterMaterialTopTabs.Screen name='plan' options={{
              tabBarShowLabel: false,
              tabBarIcon: ({color, size}) => <Icon source="notebook" size={size} color={color}/>,
              tabBarLabelStyle: fontObject,
            }}/>
          </ExpoRouterMaterialTopTabs>
      </TripContext.Provider>
    </>
  );
}
