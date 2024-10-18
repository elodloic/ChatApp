# ChatApp

## About the app:

ChatApp is a cross-platform mobile chat application built using React Native. It allows users to communicate in real-time across iOS and Android devices with near-native app performance.

## Features:

- **Real-time Messaging:** Exchange messages instantly across devices.
- **Image Sharing:** Upload and share images from your gallery or camera directly in the chat.
- **Location Sharing:** Share your live location with other users.
- **Offline mode:** Access your messaging history, even without an internet connection.
- **Custom background:** Users can select custom background colors for their chat interface.
- **Completely anonymous:** No login or account creation required.

## Technologies Used

- **React Native** (JavaScript framework)
- **Expo** (Development platform)
- **Android Studio Emulator** (Testing)
- **GiftedChat** (React Native chat library)
- **Firebase** (Database & file storage)
- **AsyncStorage** (Caching for offline mode)
- **React Native Maps** (Display shared location)
- **ImagePicker** (Upload and share images)

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/elodloic/ChatApp.git
   cd ChatApp
   ```

2. **Install dependencies:**

   Make sure to have [Node.js v18.20.4 installed](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs). Then run this command in a terminal to install the dependencies in the project folder:

   ```bash
   npm install
   ```

   Then install the Expo CLI as a global dependency (if you haven't already):

   ```bash
   npm install -g expo-cli
   ```

3. **Configure Firebase:**
   Go to Firebase Console, create a new project, and add a web app. Then copy your Firebase config credentials.
   Finally, add them to the "Firebase credentials" section of the "App.js" file:

   ```bash
   const firebaseConfig = {
   apiKey: "YOUR_API_KEY",
   authDomain: "YOUR_AUTH_DOMAIN",
   projectId: "YOUR_PROJECT_ID",
   storageBucket: "YOUR_STORAGE_BUCKET",
   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
   appId: "YOUR_APP_ID"
   ```

4. **Run the app locally:**
   ```bash
   npm run start
   ```
