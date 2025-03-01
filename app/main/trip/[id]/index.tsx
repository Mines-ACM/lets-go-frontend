import styles from "@/components/styles";
import { TripContext } from "@/components/TripProvider";
import { useContext } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Avatar, Button, Chip, Divider, Icon, List, Surface, Text, useTheme } from "react-native-paper";

export default function OverviewScreen() {

    let trip = useContext(TripContext);
    let theme = useTheme();

    return (
        <KeyboardAvoidingView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="always"
          >
            <TouchableWithoutFeedback
              onPress={Platform.OS != "web" ? Keyboard.dismiss : () => {}}
            >
              <View style={styles.inner}>
                <View style={styles.eventHeader}>
                    <Text variant="displayMedium" style={styles.boldText}>
                        {trip ? trip.title : " "}
                    </Text>
                </View>
                <Image
                  style={{
                    width: "auto",
                    height: 200,
                    borderRadius: theme.roundness,
                  }}
                  source={{
                    uri: "https://imgur.com/p7XkTEN.jpg",
                  }}
                />
                <View style={{display: 'flex', flexDirection: 'row', columnGap: 4, marginTop: 8}}>
                    <Chip>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 8}}>
                            <Icon source="calendar-check" size={16} />
                            <Text variant="bodyMedium">March 32</Text>
                        </View>
                    </Chip>
                    <View style={styles.attendants}>
                        <View style={styles.attendantAvatarBox}>
                            <Surface style={styles.attendantAvatar}>
                            <Avatar.Icon size={34} icon="account" />
                            </Surface>
                            <Surface style={styles.attendantAvatar}>
                            <Avatar.Icon size={34} icon="account" />
                            </Surface>
                            <Surface style={styles.attendantAvatar}>
                            <Avatar.Icon size={34} icon="account" />
                            </Surface>
                            <Surface style={styles.attendantAvatar}>
                            <Avatar.Icon size={34} icon="account" />
                            </Surface>
                        </View>
                        <Text variant="bodyLarge">+12</Text>
                    </View>
                </View>
                <View>
                  <Text variant="titleLarge" style={styles.boldText}>Description</Text>
                  <Text variant="bodyMedium" style={{marginTop: 8,}}>{trip ? trip.description.trim() : " "}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      );
}
