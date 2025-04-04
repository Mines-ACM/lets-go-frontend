// app/events.tsx
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, FlatList, Platform, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot, addDoc, Timestamp, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase.js';  // Firebase setup
import {} from '../../components/PaperThemes';
import { useTheme, Card, Chip, IconButton, FAB } from 'react-native-paper';
import { Redirect, Stack, useRouter } from 'expo-router';
import CreateEvent from './events/create_event';

export default function Events() {

  var theme = useTheme();
  
  interface Event {
    id: string;
    eventTitle: string;
    description: string;
    locations: string[];
    creatorId: string;
    invitedUsers: string[];
    createdAt: Timestamp;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [usernames, setUsernames] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
        return;
    }

    // Firestore query to get events created by the user or where the user is invited
    const q = query(
      collection(db, 'events'),
      where('invitedUsers', 'array-contains', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          eventTitle: data.eventTitle,
          description: data.description,
          locations: data.locations,
          creatorId: data.creatorId,
          invitedUsers: data.invitedUsers,
          createdAt: data.createdAt,
        };
      });
      setEvents(eventsData);

      // Fetch usernames immediately after setting events
      const allUserIds = [...new Set(eventsData.flatMap(event => [...event.invitedUsers]))];
      fetchUsernames(allUserIds);
    });

    // Fetch usernames for all users
    const fetchUsernames = async (userIds: string[]) => {
      const usernamePromises = userIds.map(async (uid) => {
        const userDoc = await getDoc(doc(db, 'users', uid));
        return { [uid]: userDoc.data()?.username || 'Unknown User' };
      });
      const usernameResults = await Promise.all(usernamePromises);
      const usernameMap = Object.assign({}, ...usernameResults);
      setUsernames(usernameMap);
    };

    return () => unsubscribe();
  }, []);

  const handleLogOut = async() => {
    auth.signOut();
  }

  const handleCreateEvent = async () => {
    const user = auth.currentUser;

    if (!user || !newEventTitle || !newEventDescription) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'events'), {
        eventTitle: newEventTitle,
        description: newEventDescription,
        locations: [],
        creatorId: user.uid,
        invitedUsers: [user.uid],
        createdAt: Timestamp.now(),
      });

      setNewEventTitle('');
      setNewEventDescription('');
    } catch (error) {
      console.error('Error creating event: ', error);
      alert('Error creating event');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (EventId: string) => {
    await deleteDoc(doc(db, "events", EventId));
  }

  const CreateEventBtn = () => (
    <FAB
      label="Create Event"
      icon="plus"
      style={styles.createEventBtn}
      onPress={handleCreateEventPress}
      size='medium'
    />
  );

  const eventCard = ({ item }: { item: Event }) => (
    <Card onPress={() => router.push(`/main/trip/${item.id}`)} style = {{marginTop: 20, marginLeft: 18, marginRight: 18}}>
      <Card.Title title = {item.eventTitle} titleStyle={theme.fonts.headlineSmall} subtitle={item.description} subtitleStyle={theme.fonts.labelSmall} right={() => <IconButton icon="delete-outline" onPress={() => deleteEvent(item.id)} iconColor={theme.colors.tertiary}/>}/>
      <Card.Cover source={{ uri: "https://imgur.com/p7XkTEN.jpg"}} style={styles.eventCardImage} resizeMode='cover'/>
      <Card.Content>
        <View style={{flexDirection: 'row'}}>
          {item.createdAt != null && <Chip icon="calendar-clock" style={{marginRight: 10}}>{item.createdAt.toDate().toLocaleDateString()}</Chip>}
          {item.locations.length > 0 && <Chip icon="map-marker">{item.locations}</Chip>}
        </View>
      </Card.Content>
    </Card>
  );

  const handleCreateEventPress = () => {
    router.push('/main/events/create_event');
  };

  return (
    <View style={styles.pageContainer}>
      <FlatList
        data={events}
        renderItem={eventCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No events found.</Text>}
      />
      <CreateEventBtn/>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    height: "100%"
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // White text
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  eventContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    borderRadius: 5,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  eventItem: {
    padding: 15,
    backgroundColor: '#1E1E1E', // Slightly lighter than background
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3, // Add some depth
  },
  eventCardImage: {
    borderRadius: 10,
    backgroundColor: 'none',
    padding: 0,
    margin: (Platform.OS === 'ios') ? 0 : 15,
    marginTop: (Platform.OS === 'ios') ? -16 : 0
  },
  createEventBtn: {
    position: 'absolute',
    borderRadius: 40,
    right: 0,
    bottom: 20,
    margin: 20,
  }
});
