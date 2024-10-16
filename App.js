import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Start from "./components/Start";
import Chat from "./components/Chat";

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase credentials
const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCj_2DPTDFQLicFa62TcPhAcMyAeilC1yI",
    authDomain: "chatapp-4f841.firebaseapp.com",
    projectId: "chatapp-4f841",
    storageBucket: "chatapp-4f841.appspot.com",
    messagingSenderId: "892656390008",
    appId: "1:892656390008:web:812a358e54d58bd3f6c28d",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
