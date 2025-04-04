import { Redirect, Stack } from "expo-router";
import { useState, useEffect, useLayoutEffect } from "react"; 
import { useSession } from "../../components/AuthProvider";
import { Avatar } from "react-native-paper";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Loading from "../loading";
import { Pressable, View } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function StackLayout() {

  
  const {user, loading, error} = useSession();

  const [avatarInitials, updateInitials] = useState("")
  const theme = useTheme();

  useEffect(() => {
    if (user != null) {
      const uid = user.uid;

      const getUserFname = async () => {
        const userDoc = await getDoc(doc(db, "users", uid));
        const userFname = userDoc.data()?.firstName || "Unknown Username";
        updateInitials(userFname[0]);
      }

      getUserFname();
    }
    return;
  },[user])

  if (loading)
    return <Loading />
  
  if (!user)
    return <Redirect href="/auth/(tabs)" />;

  interface userFields {
    birthday: String,
    createdAt: Date,
    email: String,
    firstName: String,
    username: String
  }
 
  return ( 
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Stack screenOptions={{statusBarBackgroundColor: theme.colors.card, navigationBarColor: theme.colors.card}}>
      <Stack.Screen name="index" options={{ 
        title: "Home",
        headerRight: () => <Profile avatarInitials={avatarInitials}/>
      }}
      />
      <Stack.Screen name="trip/[id]" options={{ title: "Event Details" }} />
      <Stack.Screen name="events/create_event" options={{ title: "Create Event" }} />
    </Stack>
    </View>
  );
}

interface ProfileInterface {
  avatarInitials: string,
}
function Profile({avatarInitials}: ProfileInterface) {
  return (
      <Pressable onPress={() => {auth.signOut()}}>
        <Avatar.Text size={36} label={avatarInitials}/>
      </Pressable>
  )
}
