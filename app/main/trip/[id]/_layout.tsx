import { Tabs } from 'expo-router';
import { Icon, useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  const fontObject = {
    fontFamily: theme.fonts.default.fontFamily,
    fontWeight: theme.fonts.default.fontWeight
  }

  return (
      <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.primary, headerShown: false}}>
          <Tabs.Screen
              name="index"
              options={{
                  title: "Overview",
                  tabBarIcon: ({color, size}) => <Icon source="home" size={size} color={color}/>,
                  tabBarLabelStyle: fontObject
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
      </Tabs>
  );
}
