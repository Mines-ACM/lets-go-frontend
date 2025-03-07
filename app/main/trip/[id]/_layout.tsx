import ShareButton from '@/components/ShareButton';
import { Trip, TripContext } from '@/components/TripProvider';
import { db } from '@/firebase.js';
import { Stack, Tabs, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, Icon, IconButton, PaperProvider, Portal, useTheme } from 'react-native-paper';
import { withLayoutContext } from "expo-router";
import {
  createMaterialTopTabNavigator
} from "@react-navigation/material-top-tabs";

const MaterialTopTabs = createMaterialTopTabNavigator();
const ExpoRouterMaterialTopTabs = withLayoutContext(MaterialTopTabs.Navigator)

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

  return (
      <>
        <Stack.Screen options={{ title: trip?.title ?? "Event Details", headerRight: () => <ShareButton /> }} />
        <TripContext.Provider value={trip}>
          <ExpoRouterMaterialTopTabs />
          {/* <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.primary, headerShown: false}}>
              <Tabs.Screen
                  name="index"
                  options={{
                      title: "Overview",
                      tabBarIcon: ({color, size}) => <Icon source="home" size={size} color={color}/>,
                      tabBarLabelStyle: fontObject,
                  }}
              />
              <Tabs.Screen
                  name="ideas"
                  options={{
                      title: "Ideas",
                      tabBarIcon: ({color, size}) => <Icon source="lightbulb-on" size={size} color={color}/>,
                      tabBarLabelStyle: fontObject
                  }}
              />
              <Tabs.Screen
                  name="plan"
                  options={{
                      title: "Plan",
                      tabBarIcon: ({color, size}) => <Icon source="notebook" size={size} color={color}/>,
                      tabBarLabelStyle: fontObject
                  }}
              />
          </Tabs> */}
      </TripContext.Provider>
    </>
  );
}
