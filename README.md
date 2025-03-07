
# Welcome to the Let's Go App 👋

This is the **Let's Go** project, a democratic way to make plans using [Expo](https://expo.dev). This app is designed to help users create, join, and manage events collaboratively. The project was bootstrapped with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) and uses **Expo Router** for file-based navigation.

#### Create a New Event

You can create an event using the "Create Event" button within the app. This feature allows users to add the event name, description, and potential locations. Each event is created by a user but can be shared with other users for collaboration.

#### Join Events

Users can join events created by other users. A future feature will include event invitations and notifications for events you're invited to.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   To start the app in development mode and clear the cache, use:

   ```bash
   npx expo start -c
   ```

In the output, you'll find options to open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction) with **Expo Router**.

## Project Structure

The app follows a simple, modular file structure with Expo Router for navigation. Key files include:

- **app/index.tsx**: Entry point of the app
- **app/_layout.tsx**: Global layout for navigation
- **app/events/**: Contains the events-related screens
- **firebase.js**: Firebase configuration for authentication and Firestore access.

## Firebase Integration

This app is integrated with Firebase for authentication and real-time data management. The Firebase configuration is set up in the `firebase.js` file.

## Commands
- **Start fresh**: To ensure the app runs without cached issues, always start the project with:

   ```bash
   npx expo start -c
   ```

- **Reset project**: If you'd like to reset the project to a clean state:

   ```bash
   npm run reset-project
   ```

## Community Resources

- [Expo documentation](https://docs.expo.dev/): Learn more about developing with Expo.
  - [Expo on GitHub](https://github.com/expo/expo): Contribute to Expo’s open-source projects.
  - [Discord community](https://chat.expo.dev): Chat with other Expo developers and ask questions.
- [React Native Documentation](https://reactnative.dev/):  Learn more about the front-end framework being used for this app

## Join the Movement!

Let's Go is not just an app, it's a democratic way to make plans! Stay tuned for more exciting features as we continue developing.

## Meet the Developers

### Colton Morris

Senior, Computer Science, Connecticut

### Connor Groeneweg

M.S. Bridge, Computer Science, Colorado

### Justin von Rosenberg

Sophomore, Computer Science, Colorado

### Bryson Cunliffe

Sophomore, Computer Science: Computer Engineering, Idaho

### Renn Gilbert

Freshman, Computer Science, Colorado

### Isaac Ly

Freshman, Computer Science, California

### Fernando A.

Freshman, Computer Science, Colorado

### Benjamin Frick

Freshman, Computer Science, Colorado

### Evan Moore

Freshman, Computer Science, Texas

### Ian Kade Johnston

Graduate May 2023, Bachelor's in Computer Science: Data Science, Colorado

### Aaron Nguyen

Freshman, Computer Science, Texas