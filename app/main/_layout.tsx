import { Redirect, Stack } from "expo-router";
import { useSession } from "../../components/AuthProvider";
import Loading from "../loading";

export default function StackLayout() {

  const {user, loading, error} = useSession();

  if (loading)
    return <Loading />
  
  if (!user)
    return <Redirect href="/auth/(tabs)" />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Events" }} />
      <Stack.Screen name="trip/[id]" options={{ title: "Event Details" }} />
      <Stack.Screen name="events/create_event" options={{ title: "Create Event" }} />
    </Stack>
  );
}
