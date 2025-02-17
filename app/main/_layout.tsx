import { Redirect, Stack } from "expo-router";
import { useSession } from "../../components/AuthProvider";
import { Avatar } from "react-native-paper";
import { auth } from "@/firebase";
import Loading from "../loading";
import { Pressable } from "react-native";
import { Header } from "@react-navigation/elements";

export default function StackLayout() {

  const {user, loading, error} = useSession();

  if (loading)
    return <Loading />
  
  if (!user)
    return <Redirect href="/auth/(tabs)" />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ 
        title: "Home",
        headerRight: Profile
      }}
      />
      <Stack.Screen name="events/create_event" options={{ title: "Create Event" }} />
      <Stack.Screen name="events/[id]" options={{ title: "Event Details" }} />
    </Stack>
  );
}

function Profile() {
  return (
      <Pressable onPress={() => {auth.signOut()}}>
        <Avatar.Text size={36} label="LB"/>
      </Pressable>
  )
}
